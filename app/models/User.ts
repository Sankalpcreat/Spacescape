// models/User.ts
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 5 }, // Change default to 5 credits for new users
});


export const User = mongoose.models.User || mongoose.model("User", UserSchema);
