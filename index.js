const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Endpoints for the application",
    },
    servers: [
      {
        url: "http://localhost:9999", // Replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // Add paths to your route/controller files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware to parse JSON requests
app.use(express.json());

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Morgan logger middleware
app.use(morgan("common"));

// File upload middleware
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
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
