const mongoose = require("mongoose");

const MemorySchema = new mongoose.Schema(
  {
    memory_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    multimediaTracks: [
      {
        type: {
          type: String,
          enum: ["audio", "document", "other"],
          required: true,
        },
        path: { type: String, required: true },
      },
    ],
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    emotions: [{ type: String }],
    colorTheme: { type: String, default: "#ffffff" },
    privacy: {
      zone: { type: String, enum: ["private", "public"], default: "private" },
      sharedWith: [{ type: String }],
    },
    viewed_by: [{ type: String }],
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("memory", MemorySchema);
