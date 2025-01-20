const MemoryService = require("../services/MemoryService");
const express = require("express");
const router = express.Router();
const {
  createTodoPermissionMiddleware,
} = require("../middlewares/authorization.middleware");

module.exports = (() => {
  const MemoryController = {
    /**
     * @swagger
     * /:
     *   post:
     *     tags:
     *       - Memory
     *     summary: Create a new memory
     *     description: Adds a new memory to the system
     *     requestBody:
     *
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               memory_id:
     *                 type: string
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               images:
     *                 type: array
     *                 items:
     *                   type: string
     *               multimediaTracks:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     type:
     *                       type: string
     *                     path:
     *                       type: string
     *               location:
     *                 type: object
     *                 properties:
     *                   latitude:
     *                     type: number
     *                   longitude:
     *                     type: number
     *               emotions:
     *                 type: array
     *                 items:
     *                   type: string
     *               colorTheme:
     *                 type: string
     *               privacy:
     *                 type: object
     *                 properties:
     *                   zone:
     *                     type: string
     *                   sharedWith:
     *                     type: array
     *                     items:
     *                       type: string
     *               createdBy:
     *                 type: string
     *     responses:
     *       201:
     *         description: Memory created successfully
     *       400:
     *         description: Title and description are required
     *       500:
     *         description: Internal server error
     */
    createMemory: async (req, res) => {
      try {
        const memoryData = req.body;

        if (!memoryData || !memoryData.title || !memoryData.description) {
          return res
            .status(400)
            .json({ message: "Title and description are required" });
        }

        const memory = await MemoryService.createMemory(memoryData);
        res.status(201).json(memory);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    },

    /**
     * @swagger
     * /memory/{id}:
     *   get:
     *     summary: Get a memory by ID
     *     description: Fetch details of a memory using its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the memory to fetch
     *     responses:
     *       200:
     *         description: Memory details
     *       400:
     *         description: Memory ID is required
     *       404:
     *         description: Memory not found
     *       500:
     *         description: Internal server error
     */
    getMemory: async (req, res) => {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).json({ message: "Memory ID is required" });
        }

        const memory = await MemoryService.getMemoryById(id);
        if (!memory) {
          return res.status(404).json({ message: "Memory not found" });
        }

        res.status(200).json(memory);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    },

    /**
     * @swagger
     * /memories:
     *   get:
     *     summary: Get all memories
     *     description: Retrieve a list of all memories
     *     responses:
     *       200:
     *         description: List of memories
     *       500:
     *         description: Internal server error
     */
    getAllMemories: async (req, res) => {
      try {
        const memories = await MemoryService.getAllMemories();
        res.status(200).json(memories);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    },

    /**
     * @swagger
     * /user/{userId}:
     *   get:
     *     summary: Get memories by user ID
     *     description: Fetch memories associated with a specific user ID
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
     *     responses:
     *       200:
     *         description: List of user's memories
     *       400:
     *         description: User ID is required
     *       500:
     *         description: Internal server error
     */
    getMemoriesByUser: async (req, res) => {
      try {
        const { userId } = req.params;

        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }

        const memories = await MemoryService.getMemoriesByUser(userId);
        res.status(200).json(memories);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    },

    /**
     * @swagger
     * /{id}:
     *   delete:
     *     summary: Delete a memory by ID
     *     description: Removes a memory from the system by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the memory to delete
     *     responses:
     *       200:
     *         description: Memory deleted successfully
     *       400:
     *         description: Memory ID is required
     *       404:
     *         description: Memory not found
     *       500:
     *         description: Internal server error
     */
    deleteMemory: async (req, res) => {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).json({ message: "Memory ID is required" });
        }

        const memory = await MemoryService.deleteMemory(id);
        if (!memory) {
          return res.status(404).json({ message: "Memory not found" });
        }

        res
          .status(200)
          .json({ message: "Memory deleted successfully", memory });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    },
  };

  router.post("/", createTodoPermissionMiddleware, MemoryController.createMemory);
  router.get("/memory/:id", MemoryController.getMemory);
  router.get("/memories", MemoryController.getAllMemories);
  router.get("/user/:userId", MemoryController.getMemoriesByUser);
  router.delete("/:id", createTodoPermissionMiddleware, MemoryController.deleteMemory);

  return router;
})();
