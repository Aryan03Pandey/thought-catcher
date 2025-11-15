import { Request } from "express";
import env from "@/env";
import { errors } from "@/utils";
import ThoughtBox from "@/db/models/ThoughtBox";

export class ThoughtBoxService {
  constructor(){}

  async all(req: Request){
    try{
      const userId = req.user?._id;
      if (!userId)
        throw new errors.Unauthorized();
        
      const boxes = await ThoughtBox
        .find({ createdBy: userId })
        .sort({ createdAt: -1 })
      
      return {
        data: boxes
      }
    }catch(error: any){
      throw new errors.InternalServerError(error.message);
    }
  }
  
  async id(req: Request){
    try{
      const userId = req.user?._id;
      if (!userId)
        throw new errors.Unauthorized();
        
      const { id } = req.params;
      if(!id)
        throw new errors.BadRequest("Thought ID not provided")
      
      const box = await ThoughtBox.findOne({
        _id: id,
        createdBy: userId
      })
        .populate({
          path: "thoughts",
          populate: {
            path: "tags",
            model: "Tag"
          },
        });
      
      if (!box)
        throw new errors.NotFound("Thoughtbox not found");
      
      return {
        data: box
      }
    }catch(error: any){
      throw new errors.InternalServerError(error.message);
    }
  }
  
  async create(req: Request){
    try{
      const userId = req.user?._id;
      if (!userId)
        throw new errors.Unauthorized();
        
      const { name, color } = req.body();
      if (!name || !color)
        throw new errors.BadRequest("Name and color are required");
        
      const count = await ThoughtBox.countDocuments({ createdBy: userId });
      if (count >= env.max_thoughtbox_per_user)
        throw new errors.BadRequest("Max thought limit reached");
        
      const existing = await ThoughtBox.findOne({
        name,
        createdBy: userId
      })
      
      if(existing)
        throw new errors.BadRequest("Thought box already exists")
        
      const box = await ThoughtBox.create({
        name,
        color,
        createdBy: userId
      });
      
      return {
        data: box
      }
      
    }catch(error: any){
      throw new errors.InternalServerError(error.message);
    }
  }
  
  async delete(req: Request){
    try{
      const userId = req.user?._id;
      if (!userId)
        throw new errors.Unauthorized();
        
      const { id } = req.params;
      if (!id)
        throw new errors.BadRequest("Thought box ID is required");
    
      const box = await ThoughtBox.findOneAndDelete({ _id: id, createdBy: userId });
      
      if(!box){
        throw new errors.NotFound("Thought box with the given id not found");
      }
      
      return {
        message: "Thought box and associated thoughts deleted successfully"
      }
    }catch(error: any){
      throw new errors.InternalServerError(error.message)
    }
  }
}