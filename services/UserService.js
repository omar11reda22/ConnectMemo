
const UserRepository = require("../repos/UserRepo");

const UserService = {
  // createUser: async (userData) => {
  //   const { password, ...rest } = userData;

  //   // Hash password before saving
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const userWithHashedPassword = { ...rest, password: hashedPassword };

  //   return await UserRepository.createUser(userWithHashedPassword);
  // },
  createUser: async (userData) => {
    // Assume userData is valid and contains all necessary fields
    return await UserRepository.createUser(userData);
  },
  getUserById: async (userId) => {
    const user = await UserRepository.findUserById(userId);
    if (!user) throw new Error("User not found");
    return user;
  },
  getallusers: async () => {
    const allusers = await UserRepository.findallusers();
    if (!allusers) throw new Error("WTF");
    return allusers;
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
  deleteUserById: async (userId) => {
    const user = await UserRepository.findUserById(userId);
    if (!user) throw new Error("User not found");

    return await UserRepository.deleteUser(userId);
  },
};

module.exports = UserService;
