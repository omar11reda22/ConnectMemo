const MemoryService = require("../services/MemoryService");
const express = require("express");
const router = express.Router();

// Define the MemoryController
// const MemoryController = {
//   // Create a new memory
//   createMemory: async (req, res, next) => {
//     try {
//       const memoryData = req.body;

//       // Validate request body
//       if (!memoryData || !memoryData.title || !memoryData.description) {
//         return res
//           .status(400)
//           .json({ message: "Title and description are required" });
//       }

//       const memory = await MemoryService.createMemory(memoryData);
//       res.status(201).json(memory);
//     } catch (error) {
//       next(error); // Pass error to the error-handling middleware
//     }
//   },

//   // Get a memory by ID
//   getMemory: async (req, res, next) => {
//     try {
//       const { id } = req.params;

//       // Validate ID
//       if (!id) {
//         return res.status(400).json({ message: "Memory ID is required" });
//       }

//       const memory = await MemoryService.getMemoryById(id);
//       if (!memory) {
//         return res.status(404).json({ message: "Memory not found" });
//       }

//       res.status(200).json(memory);
//     } catch (error) {
//       next(error); // Pass error to the error-handling middleware
//     }
//   },

//   // Get all memories
//   getAllMemories: async (req, res, next) => {
//     try {
//       const memories = await MemoryService.getAllMemories();
//       res.status(200).json(memories);
//     } catch (error) {
//       next(error); // Pass error to the error-handling middleware
//     }
//   },

//   // Get memories by user ID
//   getMemoriesByUser: async (req, res, next) => {
//     try {
//       const { userId } = req.params;

//       // Validate user ID
//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//       }

//       const memories = await MemoryService.getMemoriesByUser(userId);
//       res.status(200).json(memories);
//     } catch (error) {
//       next(error); // Pass error to the error-handling middleware
//     }
//   },

//   // Update a memory
//   updateMemory: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const updates = req.body;

//       // Validate ID
//       if (!id) {
//         return res.status(400).json({ message: "Memory ID is required" });
//       }

//       const memory = await MemoryService.updateMemory(id, updates);
//       if (!memory) {
//         return res.status(404).json({ message: "Memory not found" });
//       }

//       res.status(200).json(memory);
//     } catch (error) {
//       next(error); // Pass error to the error-handling middleware
//     }
//   },

//   // Delete a memory
//   deleteMemory: async (req, res, next) => {
//     try {
//       const { id } = req.params;

//       // Validate ID
//       if (!id) {
//         return res.status(400).json({ message: "Memory ID is required" });
//       }

//       const memory = await MemoryService.deleteMemory(id);
//       if (!memory) {
//         return res.status(404).json({ message: "Memory not found" });
//       }

//       res.status(200).json({ message: "Memory deleted successfully", memory });
//     } catch (error) {
//       next(error); // Pass error to the error-handling middleware
//     }
//   },
// };

module.exports = (
  () => {
const MemoryController = {
  // Create a new memory
  createMemory: async (req, res) => {
    try {
      const memoryData = req.body;

      // Validate request body
      if (!memoryData || !memoryData.title || !memoryData.description) {
        return res
          .status(400)
          .json({ message: "Title and description are required" });
      }

      const memory = await MemoryService.createMemory(memoryData);
      res.status(201).json(memory);
    } catch (error) {
      res.status(500).json({message:"WTF"}) // Pass error to the error-handling middleware
    }
  },

  // Get a memory by ID
  getMemory: async (req, res) => {
    try {
      const { id } = req.params; // id from url 

      // Validate ID 
      if (!id) {
        return res.status(400).json({ message: "Memory ID is required" });
      }

      const memory = await MemoryService.getMemoryById(id);
      if (!memory) {
        return res.status(404).json({ message: "Memory not found" });
      }

      res.status(200).json(memory);
    } catch (error) {
      res.status(500).json({ message: "Sorry ..!" }); // Pass error to the error-handling middleware
    }
  },

  // Get all memories
  getAllMemories: async (req, res) => {
    try {
      const memories = await MemoryService.getAllMemories();
      res.status(200).json(memories);
    } catch (error) {
      res.status(500).json("WTF") // Pass error to the error-handling middleware
    }
  },

  // Get memories by user ID
  getMemoriesByUser: async (req, res) => {
    try {
      const { userId } = req.params;

      // Validate user ID
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const memories = await MemoryService.getMemoriesByUser(userId);
      res.status(200).json(memories);
    } catch (error) {
      res.status(500).json({message:"Sorry . ..!"}) // Pass error to the error-handling middleware
    }
  },

  // Update a memory
  updateMemory: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Validate ID
      if (!id) {
        return res.status(400).json({ message: "Memory ID is required" });
      }

      const memory = await MemoryService.updateMemory(id, updates);
      if (!memory) {
        return res.status(404).json({ message: "Memory not found" });
      }

      res.status(200).json(memory);
    } catch (error) {
      res.status(500).json({message:"Sorry ..!"}) // Pass error to the error-handling middleware
    }
  },

  // Delete a memory
  deleteMemory: async (req, res) => {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id) {
        return res.status(400).json({ message: "Memory ID is required" });
      }

      const memory = await MemoryService.deleteMemory(id);
      if (!memory) {
        return res.status(404).json({ message: "Memory not found" });
      }

      res.status(200).json({ message: "Memory deleted successfully", memory });
    } catch (error) {
      res.status(500).json({message:"Sorry ..!"}) // Pass error to the error-handling middleware
    }
  },
};


// const MemoryController = require("../controllers/Memory.controller");


 router.post("/", MemoryController.createMemory); // Create a memory
 router.get("/memory/:id", MemoryController.getMemory); // Get a memory by ID
router.get("/memories", MemoryController.getAllMemories); // getall memories 
 router.get("/user/:userId", MemoryController.getMemoriesByUser); 
 //router.put("/:id", MemoryController.updateMemory); // Update a memory by ID
 router.delete("/:id", MemoryController.deleteMemory); // Delete a memory by ID


return router;
  } 


)();
