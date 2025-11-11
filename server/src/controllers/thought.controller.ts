import { ThoughtService } from "@/services/thought.service";
import { Request, Response } from "express";

export class ThoughtController {
  constructor(private readonly service : ThoughtService){
    
  }
 
  async all(req: Request, res: Response){
    
  }

  async id(req: Request, res: Response){
    
  }
  
  async create(req: Request, res: Response){
    
  }
  
  async delete(req: Request, res: Response){
    
  }
  
}