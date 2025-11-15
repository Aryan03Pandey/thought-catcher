import { Request } from "express";
import env from "@/env";
import { errors } from "@/utils";
import Tag from "@/db/models/Tag";

export class TagsService {
  constructor(){}
  
  async all(req: Request){
    try{
      const userId = req.user?._id;
      
      if (!userId)
        throw new errors.Unauthorized();
      
      const tags = await Tag.find({ createdBy: userId });
      
      return {
        data: tags
      }
    }catch(error : any){
      throw new errors.InternalServerError(error.message);
    }
  }
  
  async create(req: Request){
    try{ 
      const userId = req.user?._id;
      if (!userId)
        throw new errors.Unauthorized();
        
      const { name } = req.body();
      if (!name)
        throw new errors.BadRequest("Tag Name Cannot be Empty");
        
      // check max tags for a user
      const tagCount = await Tag.countDocuments({ createdBy: userId });
      if(tagCount >= env.max_tags_per_user){
        throw new errors.BadRequest("Tag Limit reached for user");
      }
      
      // Check for existing tag with same Name
      const existing = await Tag.findOne({
        name,
        createdBy: userId
      })
      
      if(existing)
        throw new errors.BadRequest("Tag with this name already exists")
        
      const tag = await Tag.create({
        name, 
        createdBy: userId
      })
      
      return {
        data: tag
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
        throw new errors.BadRequest("Tag id required");
        
      const tag = await Tag.findOneAndDelete({
        _id: id, 
        createdBy: userId
      })
      
      if (!tag)
        throw new errors.NotFound("Tag not found");
        
      return {
        message: "Tag deleted successfully"
      }      
    }catch(error: any){
      throw new errors.InternalServerError(error.message);
    }
  }
  
}