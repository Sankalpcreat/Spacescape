import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false }, // Add name field for OAuth users
  image: { type: String, required: false }, // Add image field for profile picture from OAuth
  credits: { type: Number, default: 3 }, // Default credits for new users
  username: { type: String, required: false, unique: true }, // Optional username
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
