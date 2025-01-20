const { registerUser, loginUser } = require("../services/auth.Service");
const router = require("express").Router();

/**
 * @swagger
 *  /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: This endpoint registers a new user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               profilePicture:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/profile.jpg"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "jwt.token.here"
 *       500:
 *         description: Failed to register user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to register user"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login an existing user
 *     description: This endpoint logs in a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt.token.here"
 *       500:
 *         description: Failed to login user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to login user"
 */

module.exports = (() => {
  // Register user route
  router.post("/auth/register", async (req, res) => {
    try {
      const {
        user_id,
        first_name,
        last_name,
        email,
        password,
        profilePicture,
        user_type,
        is_active,
      } = req.body; // Directly use the entire body as user data

      // Call registerUser service to handle user registration and get the token
      const { token } = await registerUser({
        user_id,
        first_name,
        last_name,
        email,
        password,
        profilePicture,
        user_type,
        is_active,
      });

      // Send success response with the token
      res.status(201).json({ success: true, token });
    } catch (error) {
      console.error("Error in register:", error.message);
      res
        .status(500)
        .json({ message: error.message || "Failed to register user" });
    }
  });

  // Login user route
  router.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body; // Directly use the entire body as user credentials

      // Call loginUser service to handle user login and get the token
      const { token } = await loginUser({ email, password });

      // Send success response with the token
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error in login:", error.message);
      res
        .status(500)
        .json({ message: error.message || "Failed to login user" });
    }
  });

  return router;
})();
