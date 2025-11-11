import { ThoughtBoxService } from "@/services/thoughtbox.service";
import { Request, Response } from "express";

export class ThoughtBoxController {
  constructor(private readonly service: ThoughtBoxService) {
  }
  
  async all(req: Request, res: Response) {
    const result = await this.service.all(req);
    res.status(200).json({
      data: result
    })
  }
  
  async id(req: Request, res: Response) {
    const result = await this.service.id(req);
    res.status(200).json({
      data: result
    })
  }
  
  async create(req: Request, res: Response) {
    const result = await this.service.create(req);
    res.status(201).json({
      data: result
    })
  }
  
  async delete(req: Request, res: Response) {
    const result = await this.service.delete(req);
    res.status(204).json({
      data: result
    })
  }
} 