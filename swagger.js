const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0", // OpenAPI version
  info: {
    title: "Node API", // API title
    version: "1.0.0", // API version
    description: "A simple Express API for managing users", // API description
  },
  servers: [
    {
      url: "http://localhost:9797", // Define the server URL
      description: "Development server",
    },
  ],
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API docs (for routing files, change it accordingly)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
