const bcrypt = require("bcryptjs");
const UserRepository = require("../repositories/userRepository");

const UserService = {
  createUser: async (userData) => {
    const { password, ...rest } = userData;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const userWithHashedPassword = { ...rest, password: hashedPassword };

    return await UserRepository.createUser(userWithHashedPassword);
  },
  getUserById: async (userId) => {
    const user = await UserRepository.findUserById(userId);
    if (!user) throw new Error("User not found");
    return user;
  },
  authenticateUser: async (email, password) => {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    return user;
  },
  updateUser: async (userId, updateData) => {
    return await UserRepository.updateUser(userId, updateData);
  },
};

module.exports = UserService;
