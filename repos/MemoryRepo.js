const Memory = require("../models/MemoryModel");

const MemoryRepository = {
  createMemory: async (memoryData) => {
    return await Memory.create(memoryData);
  },
  getMemoryById: async (memoryId) => {
    return await Memory.findOne({ memory_id: memoryId });
  },
  getAllMemories: async () => {
    return await Memory.find({});
  },
  getMemoriesByUser: async (userId) => {
    return await Memory.find({ createdBy: userId });
  },
  updateMemory: async (memoryId, updateData) => {
    return await Memory.findOneAndUpdate({ memory_id: memoryId }, updateData, {
      new: true,
    });
  },
  deleteMemory: async (memoryId) => {
    return await Memory.findOneAndDelete({ memory_id: memoryId });
  },
};

module.exports = MemoryRepository;
