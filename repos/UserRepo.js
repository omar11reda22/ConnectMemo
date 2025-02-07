const User = require("../models/UserModel");

const UserRepository = {
   createUser : async ({ 
  user_id, 
  first_name, 
  last_name, 
  email, 
  password, 
  profilePicture, 
  is_active, 
  user_type, 
  salt 
}) => {
  try {
    // Attempt to create a new user
    return await User.create({
      user_id,
      first_name,
      last_name,
      email,
      password,
      profilePicture,
      salt, 
      user_type,
      is_active,
    });
  } catch (error) {
    // Log the error and throw the message
    console.error("Error in createUser:", error.message);
    throw new Error(error.message); // Re-throw the error with its message
  }
},

  findUserById: async (userId) => {
    return await User.findOne({ user_id: userId });
  },
  findallusers: async () => {
    return await User.find({});
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
