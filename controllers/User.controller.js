const UserService = require("../services/UserService");
const express = require("express");
const router = express.Router();

module.exports = (() => {
  const UserController = {
    // Create a new user
    createUser: async (req, res) => {
      try {
        const userData = req.body;

        // Validate required fields
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

    // Get user by ID
    getUserById: async (req, res) => {
      try {
        const { userId } = req.params;
        console.log(userId);
        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }

        const user = await UserService.getUserById(userId);
        console.log(user)
      return res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "sorry ..!!" });
      }
    },

    // Authenticate user
    //   authenticateUser: async (req, res) => {
    //     try {
    //       const { email, password } = req.body;

    //       // Validate required fields
    //       if (!email || !password) {
    //         return res
    //           .status(400)
    //           .json({ message: "Email and password are required" });
    //       }

    //       const user = await UserService.authenticateUser(email, password);
    //       res.status(200).json({
    //         message: "Authentication successful",
    //         user,
    //       });
    //     } catch (error) {
    //       res.status(500).json({message:"sorry ..!"})
    //     }
    //   },

    // Update user
    updateUser: async (req, res) => {
      try {
        const { userId } = req.params;
        const updateData = req.body;

        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }

        const updatedUser = await UserService.updateUser(userId, updateData);
        res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        });
      } catch (error) {
        res.status(500).json({ message: "sorry ..!" });
      }
    },

    getAllUsers: async (req, res) => {
  try {
    const users = await UserService.getallusers();
    console.log("Users fetched from service:", users);
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
  
},

    deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      await UserService.deleteUserById(userId);

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message || "Internal server error" });
    }
  }

    // getAllUsers: async (req, res) => {
    //   try {
    //     const users = await UserService.getAllUsers();
    //    // console.log(users);
    //  return  res.status(200).json(users);
    //   } catch (error) {
    //     res.status(500).json({ message: "sorry can't ..!" });
    //   }
    // },
  };

  router.post("/users", UserController.createUser); // Create a user
  router.get("/users/:userId", UserController.getUserById); 
  router.get("/users" , UserController.getAllUsers); 
 // router.get("/user/:userId", MemoryController.getMemoriesByUser); 
 // router.put("/:id", UserController.updateUser); 
  router.delete("/users/:userId", UserController.deleteUser); 

  return router;
}

)();

//module.exports = UserController;
