import { Request, Response } from "express";
import { TagsService } from "@/services/tags.service";

export class TagsController {
  constructor(private readonly service : TagsService){
  }
 
  async all(req: Request, res: Response){
    const result = await this.service.all(req);
    res.status(200).json({
      data: result
    })
  }
  
  async create(req: Request, res: Response){
    const result = await this.service.create(req);
    res.status(200).json({
      data: result
    })
  }
  
  async delete(req: Request, res: Response){
    const result = await this.service.delete(req);
    res.status(200).json({
      data: result
    })
  }
  
}