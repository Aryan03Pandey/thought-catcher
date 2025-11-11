import mongoose, { Schema, Document } from "mongoose";
import Thought from "./Thought";

export interface IThoughtBox extends Document {
  name: string;
  color: string;
  numberOfThoughts: number;
  thoughts: mongoose.Types.ObjectId[]; // Array of references to Thought documents
  createdBy: mongoose.Types.ObjectId; // optional: if user-specific
  createdAt: Date;
  updatedAt: Date;
}

const ThoughtBoxSchema = new Schema<IThoughtBox>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
    },
    numberOfThoughts: {
      type: Number,
      default: 0,
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
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

// automatically sync numberOfThoughts with thoughts.length
ThoughtBoxSchema.pre("save", function (next) {
  this.numberOfThoughts = this.thoughts.length;
  next();
});

// Cascade delete thoughts when a ThoughtBox is deleted
ThoughtBoxSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await Thought.deleteMany({ thoughtBox: doc._id });
  }
  next();
});

export default mongoose.models.ThoughtBox || mongoose.model<IThoughtBox>("ThoughtBox", ThoughtBoxSchema);