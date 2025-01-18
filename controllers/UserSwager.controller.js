const UserService = require("../services/UserService");
const express = require("express");
const router = express.Router();

module.exports = (() => {
  const UserController = {
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     description: Adds a new user to the system
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               first_name:
     *                 type: string
     *               last_name:
     *                 type: string
     *     responses:
     *       201:
     *         description: User created successfully
     *       400:
     *         description: All required fields must be provided
     *       500:
     *         description: Internal server error
     */
    createUser: async (req, res) => {
      try {
        const userData = req.body;

        if (
          !userData.email ||
          !userData.password ||
          !userData.first_name ||
          !userData.last_name
        ) {
          return res
            .status(400)
            .json({ message: "All required fields must be provided" });
        }

        const newUser = await UserService.createUser(userData);
        res.status(201).json({
          message: "User created successfully",
          user: newUser,
        });
      } catch (error) {
        res.status(500).json({ message: "sorry ..!" });
      }
    },

    /**
     * @swagger
     * /users/{userId}:
     *   get:
     *     summary: Get a user by ID
     *     description: Fetch details of a user using their ID
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to fetch
     *     responses:
     *       200:
     *         description: User details
     *       400:
     *         description: User ID is required
     *       500:
     *         description: Internal server error
     */
    getUserById: async (req, res) => {
      try {
        const { userId } = req.params;

        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }

        const user = await UserService.getUserById(userId);
        return res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "sorry ..!!" });
      }
    },

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     description: Retrieve a list of all users
     *     responses:
     *       200:
     *         description: List of users
     *       500:
     *         description: Internal server error
     */
    getAllUsers: async (req, res) => {
      try {
        const users = await UserService.getallusers();
        return res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    },

    /**
     * @swagger
     * /users/{userId}:
     *   delete:
     *     summary: Delete a user by ID
     *     description: Removes a user from the system by their ID
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to delete
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       400:
     *         description: User ID is required
     *       500:
     *         description: Internal server error
     */
    deleteUser: async (req, res) => {
      try {
        const { userId } = req.params;

        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }

        await UserService.deleteUserById(userId);

        return res.status(200).json({ message: "User deleted successfully" }); 
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    },
  };

  // Define routes
  router.post("/users", UserController.createUser); // Create a user
  router.get("/users/:userId", UserController.getUserById); // Get a user by ID
  router.get("/users", UserController.getAllUsers); // Get all users
  router.delete("/users/:userId", UserController.deleteUser); // Delete a user by ID

  return router;
})();
