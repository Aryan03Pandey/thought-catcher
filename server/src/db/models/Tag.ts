import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date
}

const TagSchema: Schema<ITag> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Tag || mongoose.model<ITag>("Tag", TagSchema)