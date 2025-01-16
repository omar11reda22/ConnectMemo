const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema(
  {
    connection_id: { type: String, required: true },
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "blocked"],
      default: "pending",
    },
    requestedAt: { type: Date, default: Date.now },
    connectedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Connection", ConnectionSchema);
