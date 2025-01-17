const UserService = require("../services/UserService");
const express = require("express");
const router = express.Router();

// const UserController = {
//   // Create a new user
//   createUser: async (req, res) => {
//     try {
//       const userData = req.body;

//       // Validate required fields
//       if (
//         !userData.email ||
//         !userData.password ||
//         !userData.firstName ||
//         !userData.lastName
//       ) {
//         return res
//           .status(400)
//           .json({ message: "All required fields must be provided" });
//       }

//       const newUser = await UserService.createUser(userData);
//       res.status(201).json({
//         message: "User created successfully",
//         user: newUser,
//       });
//     } catch (error) {
//       res.status(500).json({message:"sorry ..!"})
//     }
//   },

//   // Get user by ID
//   getUserById: async (req, res) => {
//     try {
//       const { userId } = req.params;

//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//      }

//     const user = await UserService.getUserById(userId);
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({message:"sorry ..!!"});
//     }
//   },

//   // Authenticate user
// //   authenticateUser: async (req, res) => {
// //     try {
// //       const { email, password } = req.body;

// //       // Validate required fields
// //       if (!email || !password) {
// //         return res
// //           .status(400)
// //           .json({ message: "Email and password are required" });
// //       }

// //       const user = await UserService.authenticateUser(email, password);
// //       res.status(200).json({
// //         message: "Authentication successful",
// //         user,
// //       });
// //     } catch (error) {
// //       res.status(500).json({message:"sorry ..!"})
// //     }
// //   },

//   // Update user
//   updateUser: async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const updateData = req.body;

//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//       }

//       const updatedUser = await UserService.updateUser(userId, updateData);
//       res.status(200).json({
//         message: "User updated successfully",
//         user: updatedUser,
//       });
//     } catch (error) {
//        res.status(500).json({message:"sorry ..!"})
//     }
//   },
// };

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
          !userData.firstName ||
          !userData.lastName
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

        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }

        const user = await UserService.getUserById(userId);
        res.status(200).json(user);
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
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "sorry ..!" });
      }
    },
  };

  router.post("/", UserController.createUser); // Create a user
  router.get("/:id", UserController.getUserById); // Get a memory by ID
  router.get("/users" , UserController.getAllUsers); // getall memories
 // router.get("/user/:userId", MemoryController.getMemoriesByUser); // Get all memories of a user
  router.put("/:id", UserController.updateUser); // Update a memory by ID
 // router.delete("/:id", UserController); // Delete a memory by ID

  return router;
})();

//module.exports = UserController;
