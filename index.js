const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Morgan logger middleware
app.use(morgan("common"));

// File upload middleware
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: false,
    preserveExtension: true,
  })
);

// Controller Registrations
const controllersDirPath = path.join(__dirname, "controllers");
const controllersDirectory = fs.readdirSync(controllersDirPath);

for (const controllerFile of controllersDirectory) {
  const controller = require(path.join(controllersDirPath, controllerFile));

  if (typeof controller === "function") {
    app.use(controller); // Use it as middleware
  } else if (controller.router) {
    app.use(controller.router);
  } else {
    console.warn(
      `${controllerFile} does not export a valid middleware/router.`
    );
  }
}

// Global error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Internal Server Error:", err.stack);
//   res
//     .status(500)
//     .json({ message: "Internal Server Error", error: err.message });
// });

// Export the app
module.exports = app;
