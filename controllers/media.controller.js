const { uploadService } = require("../services/media.service");
const { imageKitPayloadBuilder } = require("../utils/media.util");

module.exports = (() => {
  const router = require("express").Router();

  router.post("/upload", async (req, res, next) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }
      const uploadedFile = req.files.iti; // Assuming the file input field is named 'file'

      const uploadPayload = [];

      if (Array.isArray(uploadedFile)) {
        for (const expressUploadedFule of uploadedFile) {
          const { fileName, src } = imageKitPayloadBuilder(expressUploadedFule);
          uploadPayload.push({
            src,
            fileName,
          });
        }
        const response = await uploadService.upload({
          files: uploadPayload,
        });
        res.json({
          message: response?.message || "uploaded!",
        });
      } else {
        // Get the original file name and extension
        const { fileName, src } = imageKitPayloadBuilder(uploadedFile);
        uploadPayload.push({
          src,
          fileName,
        });
        const response = await uploadService.upload({
          files: uploadPayload,
        });
        res.json({
          message: response?.message || "uploaded!",
        });
      }
    } catch (execption) {
      console.log(execption);
    }
  });

  return router;
})();
