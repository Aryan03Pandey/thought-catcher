import { Request, Response } from "express";
import { TagsService } from "@/services/tags.service";
import { GetSchemaResponseType } from "@thoughts/validation";

export class TagsController {
  constructor(private readonly service : TagsService){
  }
 
  async all(req: Request, res: Response<GetSchemaResponseType<"v1/tags">>){
    const result = await this.service.all(req);
    res.status(200).json({
      message: 'Tags fetched successfully',
      data: result
    })
  }
  
  async create(req: Request, res: Response){
    const result = await this.service.create(req);
    res.status(200).json({
      message: 'Tag created successfully',
      data: result
    })
  }
  
  async delete(req: Request, res: Response){
    const result = await this.service.delete(req);
    res.status(200).json({
      message: 'Tag deleted successfully',
      data: result
    })
  }
  
}