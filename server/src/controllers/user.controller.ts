import { UserService } from "@/services/user.service";
import { Request, Response } from "express";

export class UserController {
  constructor(private readonly service : UserService){
    
  }
  
  async login(req: Request, res: Response){
    const result = await this.service.login(req);
    res.status(200).json({
      message: "Login succesful",
      data: result
    })
  }
  
  async refresh(req: Request, res: Response){
    const result = await this.service.refresh(req);
    res.json({
      message: "Refresh successful",
      data: result
    })
  }
  
  async logout(req: Request, res: Response) {
    const result = await this.service.logout(req);
    res.status(200).json({
      message: "Logout successful",
      data: result
    })
  }
  
  async me(req: Request, res: Response){
    const result = await this.service.me(req);
    res.json({
      message: "User Info",
      data: result
    })
  }
 
  async update(req: Request, res: Response){
    const result = await this.service.update(req);
    res.status(200).json({
      message: "User updated successfully",
      data: result
    })
  }
  
  async check(req: Request, res: Response){
    const result = await this.service.check();
    res.json({
      message: 'Check complete',
      data: result
    })
  }
  
}