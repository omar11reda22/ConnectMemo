const bcrypt = require("bcrypt");
const UserRepository = require("../repos/User2Repo");

const UserService = {
  // createUser: async (userData) => {
  //   const { password, ...rest } = userData;

  //   // Hash password before saving
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const userWithHashedPassword = { ...rest, password: hashedPassword };

  //   return await UserRepository.createUser(userWithHashedPassword);
  // },
  // createUser: async (userData) => {
  //   // Assume userData is valid and contains all necessary fields
  //   return await UserRepository.createUser(userData);
  // },
  createUser: async (userData) => {
    try {
      // Generate salt
      const salt = await bcrypt.genSalt(10);

      // Hash the password with the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);

      // Prepare user data for creation
      const userPayload = {
        user_id: userData.user_id, // Ensure user_id is passed
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: hashedPassword,
        profilePicture: userData.profilePicture,
        is_active: userData.is_active,
        salt, // Store the generated salt
        user_type: userData.user_type, // Set default user_type
        profilePicture: userData.profilePicture || null, // Optional
        // is_active: true, // Default to active
      };

      // after creating return this user
      const createdUser = await UserRepository.createUser(userPayload);
      // after returning this user will take some data to create claims to return it
      const claim = {
        username: `${createdUser.first_name} ${createdUser.last_name}`, // Combine first and last names
        email: createdUser.email,
        password: hashedPassword,
        salt,
        user_type: createdUser.user_type,
      };

      return claim;
    } catch (error) {
      console.error("Error in createUser service:", error);
      throw new Error("Failed to create user");
    }
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
