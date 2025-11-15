import { Request } from "express";
import env from "@/env";
import { errors } from "@/utils";
import Thought from "@/db/models/Thought";
import ThoughtBox from "@/db/models/ThoughtBox";

export class ThoughtService {
  constructor() {}

  async all(req: Request) {
    try {
      const userId = req.user?._id;
      if (!userId) throw new errors.Unauthorized();

      const { page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const total = await Thought.countDocuments({ createdBy: userId });

      const thoughts = await Thought.find({ createdBy: userId })
        .populate("tags")
        .populate("thoughtBox")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      return {
        data: thoughts,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      };
    } catch (error: any) {
      throw new errors.InternalServerError(error.message);
    }
  }

  async id(req: Request) {
    try {
      const userId = req.user?._id;
      if (!userId) throw new errors.Unauthorized();

      const { id } = req.params;
      if (!id) throw new errors.BadRequest("Thought ID not provided");

      const thought = await Thought.findOne({
        _id: id,
        createdBy: userId,
      })
        .populate("tags")
        .populate("thoughtBox");

      if (!thought) throw new errors.NotFound("Thought not found");

      return {
        data: thought,
      };
    } catch (error: any) {
      throw new errors.InternalServerError(error.message);
    }
  }

  async create(req: Request) {
    try {
      const userId = req.user?._id;
      if (!userId) throw new errors.Unauthorized();

      const { text, thoughtBoxId, tags } = req.body;
      if (!text || !thoughtBoxId)
        throw new errors.BadRequest("Text and thoughtBoxId are required");

      // Ensure valid tag length
      if (tags && tags.length > env.max_tags_per_thought)
        throw new errors.BadRequest(`Max ${env.max_tags_per_thought} tags allowed per thought`);

      // Validate the ThoughtBox ownership
      const box = await ThoughtBox.findOne({
        _id: thoughtBoxId,
        createdBy: userId,
      });

      if (!box) throw new errors.NotFound("Associated ThoughtBox not found");

      const thought = await Thought.create({
        text,
        thoughtBox: thoughtBoxId,
        tags: tags || [],
        createdBy: userId,
      });

      // Update the ThoughtBox reference 
      box.thoughts.push(thought._id);
      await box.save();

      return {
        data: thought,
      };
    } catch (error: any) {
      throw new errors.InternalServerError(error.message);
    }
  }

  async delete(req: Request) {
    try {
      const userId = req.user?._id;
      if (!userId) throw new errors.Unauthorized();

      const { id } = req.params;
      if (!id) throw new errors.BadRequest("Thought ID is required");

      const thought = await Thought.findOneAndDelete({
        _id: id,
        createdBy: userId,
      });

      if (!thought) throw new errors.NotFound("Thought not found");

      // Update the associated ThoughtBox
      if (thought.thoughtBox) {
        await ThoughtBox.findByIdAndUpdate(thought.thoughtBox, {
          $pull: { thoughts: thought._id },
        });
      }

      return {
        message: "Thought deleted successfully",
      };
    } catch (error: any) {
      throw new errors.InternalServerError(error.message);
    }
  }
}