// models/GuestUser.ts
import mongoose from "mongoose";

const GuestUserSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  ip: { type: String, required: true, unique: true }, // To ensure one guest per IP
  credits: { type: Number, default: 1 }, // 1 credit for guest users
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // Expires in 24 hours
});

export const GuestUser = mongoose.models.GuestUser || mongoose.model("GuestUser", GuestUserSchema);
