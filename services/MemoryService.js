const MemoryRepository = require("../repos/MemoryRepo");

const MemoryService = {
  createMemory: async (memoryData) => {
    // Add validation or additional logic if needed
    return await MemoryRepository.createMemory(memoryData);
  },
  getMemoryById: async (memoryId) => {
    const memory = await MemoryRepository.getMemoryById(memoryId);
    if (!memory) throw new Error("Memory not found");
    return memory;
  },
  getAllMemories: async () => {
    return await MemoryRepository.getAllMemories();
  },
  getMemoriesByUser: async (userId) => {
    return await MemoryRepository.getMemoriesByUser(userId);
  },
  updateMemory: async (memoryId, updateData) => {
    const updatedMemory = await MemoryRepository.updateMemory(
      memoryId,
      updateData
    );
    if (!updatedMemory) throw new Error("Memory not found or update failed");
    return updatedMemory;
  },
  deleteMemory: async (memoryId) => {
    const deletedMemory = await MemoryRepository.deleteMemory(memoryId);
    if (!deletedMemory) throw new Error("Memory not found or deletion failed");
    return deletedMemory;
  },
};

module.exports = MemoryService;
