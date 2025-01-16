const MemoryService = require("../services/MemoryService");

const MemoryController = {
  createMemory: async (req, res) => {
    try {
      const memory = await MemoryService.createMemory(req.body);
      res.status(201).json(memory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getMemory: async (req, res) => {
    try {
      const memory = await MemoryService.getMemoryById(req.params.id);
      res.status(200).json(memory);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getAllMemories: async (req, res, next) => {
    try {
      const memories = await MemoryService.getAllMemories();
      res.status(200).json(memories);
    } catch (error) {
      next(error);
    }
  },
  getMemoriesByUser: async (req, res) => {
    try {
      const memories = await MemoryService.getMemoriesByUser(req.params.userId);
      res.status(200).json(memories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateMemory: async (req, res) => {
    try {
      const memory = await MemoryService.updateMemory(req.params.id, req.body);
      res.status(200).json(memory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteMemory: async (req, res) => {
    try {
      const memory = await MemoryService.deleteMemory(req.params.id);
      res.status(200).json({ message: "Memory deleted successfully", memory });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = MemoryController;
