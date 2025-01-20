const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true }, // Added salt field
    user_type: {
      type: String,
      enum: ["super_admin", "verified_user"], // Enum for user_type
      required: true,
    },
    profilePicture: { type: String },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// register comparePassword on the schema
UserSchema.methods.comparePassword = async function (enteredPassword) {
  // Check if the user has a salt
  console.log(this.password);
  if (!this.salt) {
    // Generate a new salt and hash the password

    console.log("entered");
    this.salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, this.salt);
    await this.save();
  }

  // Compare the entered password with the hashed password
  const hashedPassword = await bcrypt.hash(enteredPassword, this.salt);
  console.log(hashedPassword);

  console.log(hashedPassword === this.password);
  return hashedPassword === this.password;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
