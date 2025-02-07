const bcrypt = require("bcrypt");
const { signToken } = require("../utils/jwttoken.manager");
const { createUser, authenticateUser } = require("../services/UserService");


// Register user [after register will return a token]
const registerUser =async ({
  user_id,
  first_name,
  last_name,
  email,
  password,
  profilePicture,
  user_type,
  is_active,
}) => {
  try {
    // Call createUser to handle user creation and retrieve the claim
    const claims = await createUser({
      user_id,
      first_name,
      last_name,
      email,
      password,
      profilePicture,
      user_type,
      is_active,
    });
    // after user create user this method will return a claim to this user to use signtoken to give this token to this user

    // Generate a JWT token using the returned claim
    const token = signToken({claims});

    // Return the token
    return { token };
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error("Failed to register user");
  }
};

// Login user
const loginUser = async ({ email, password }) => {
  try {
    const user = await authenticateUser(email, password);

    const claims = {
      username: `${user.first_name} ${user.last_name}`,
      email: user.email,
      user_type: user.user_type,
    };

    const token = signToken({claims});

    return { token };
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw new Error("Failed to login user");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
