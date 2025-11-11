import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true, // ✅ faster lookup when finding by googleId
    },
    name: {
      type: String,
      required: true,
      trim: true, // ✅ remove accidental spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ✅ ensures case-insensitive uniqueness
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // optional validation
    },
    picture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // ✅ adds createdAt and updatedAt automatically
  }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);