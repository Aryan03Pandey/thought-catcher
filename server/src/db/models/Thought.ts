import mongoose, { Schema, Document } from "mongoose";

export interface IThought extends Document {
  title: string;
  content: string;
  thoughtBox: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const ThoughtSchema = new Schema<IThought>(
  {
    title: {
      type: String,
      required: false,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    thoughtBox: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ThoughtBox",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Thought || mongoose.model<IThought>("Thought", ThoughtSchema);
