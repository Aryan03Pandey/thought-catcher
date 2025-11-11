import { Request, Response } from "express";
import { TagsService } from "@/services/tags.service";

export class TagsController {
  constructor(private readonly service : TagsService){
  }
 
  async all(req: Request, res: Response){
    
  }
  
  async create(req: Request, res: Response){
    
  }
  
  async delete(req: Request, res: Response){
    
  }
  
}