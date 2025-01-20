const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0", // OpenAPI version
  info: {
    title: "Node API", // API title
    version: "1.0.0", // API version
    description: "A simple Express API for managing users and memories", // API description
  },
  servers: [
    {
      url: "http://localhost:9797", // Define the server URL
      description: "Development server",
    },
  ],
  paths: {
    "/": {
      post: {
        tags: ["Memory"],
        summary: "Create a new memory",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Memory",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Memory created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Memory",
                },
              },
            },
          },
        },
      },
    },
    "/users": {
      post: {
        tags: ["User"],
        summary: "Create a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Memory: {
        type: "object",
        properties: {
          memory_id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          images: {
            type: "array",
            items: { type: "string", format: "url" },
          },
          multimediaTracks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["audio", "video"] },
                path: { type: "string", format: "url" },
              },
            },
          },
          location: {
            type: "object",
            properties: {
              latitude: { type: "number" },
              longitude: { type: "number" },
            },
          },
          emotions: {
            type: "array",
            items: { type: "string" },
          },
          colorTheme: { type: "string", format: "color" },
          privacy: {
            type: "object",
            properties: {
              zone: { type: "string", enum: ["private", "public"] },
              sharedWith: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          createdBy: { type: "string" },
        },
      },
      User: {
        type: "object",
        properties: {
          user_id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API docs (for routing files, change it accordingly)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
