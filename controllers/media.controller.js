const { uploadService } = require("../services/media.service");
const { imageKitPayloadBuilder } = require("../utils/media.util");
const {APP_CONFIG} = require("../config/app.config");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = (() => {
  const router = require("express").Router();

  // Endpoint for file upload
  router.post("/upload", async (req, res, next) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }

      const uploadedFile = req.files.iti; // Assuming the file input field is named 'iti'

      const uploadPayload = [];

      if (Array.isArray(uploadedFile)) {
        for (const expressUploadedFile of uploadedFile) {
          const { fileName, src } = imageKitPayloadBuilder(expressUploadedFile);
          uploadPayload.push({
            src,
            fileName,
          });
        }

        const response = await uploadService.upload({
          files: uploadPayload,
        });
        res.json({
          message: response?.message || "Uploaded successfully!",
        });
      } else {
        // Single file upload
        const { fileName, src } = imageKitPayloadBuilder(uploadedFile);
        uploadPayload.push({
          src,
          fileName,
        });

        const response = await uploadService.upload({
          files: uploadPayload,
        });
        res.json({
          message: response?.message || "Uploaded successfully!",
        });
      }
    } catch (exception) {
      console.error(exception);
      next(exception); // Call the next middleware for error handling
    }
  });

  // Endpoint for file download
  router.get("/download", async (req, res, next) => {
    try {
      const url = req.query.url; // Get URL from query parameter
      if (!url) {
        return res.status(400).send("URL query parameter is required.");
      }

      const completeURL = `https://ik.imagekit.io/${APP_CONFIG.IMAGEKIT_INSTANCE_ID}/${url}`;
      console.log(`Download URL: ${completeURL}`);

      const response = await axios({
        method: "get",
        url: completeURL,
        responseType: "stream",
      });

      const destinationPath = path.join(__dirname, `../pics/${Date.now()}.png`);
      const writer = fs.createWriteStream(destinationPath);

      response.data.pipe(writer);

      writer.on("finish", () => {
        console.log(`Image downloaded successfully to ${destinationPath}`);
        res.json({
          message: "File downloaded successfully",
          filePath: destinationPath,
        });
      });

      writer.on("error", (err) => {
        console.error("Error writing the file:", err);
        res.status(500).send("Error downloading the file.");
      });
    } catch (error) {
      console.error("Error downloading the image:", error);
      next(error); // Call the next middleware for error handling
    }
  });

  return router;
})();
