const User = require("../models/User");

const UserRepository = {
  createUser: async (userData) => {
    return await User.create(userData);
  },
  findUserById: async (userId) => {
    return await User.findOne({ user_id: userId });
  },
  findUserByEmail: async (email) => {
    return await User.findOne({ email });
  },
  updateUser: async (userId, updateData) => {
    return await User.findOneAndUpdate({ user_id: userId }, updateData, {
      new: true,
    });
  },
  deleteUser: async (userId) => {
    return await User.findOneAndDelete({ user_id: userId });
  },
};

module.exports = UserRepository;
