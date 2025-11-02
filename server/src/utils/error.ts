import { RequestHandler } from "express";

type AsyncHandler = (fn : RequestHandler) => RequestHandler

export const asyncHandler : AsyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

export const errors = {
  BadRequest: class BadRequest extends Error {
    public status = 400;
    
    constructor(message?: string){
      message = message || 'Bad Request'
      super(message);
      this.name = "BadRequest";
    }
  },
  Unauthorized: class Unauthorized extends Error {
    public status = 401;
    
    constructor(message?: string){
      message = message || 'Unauthorized'
      super(message);
      this.name = "Unauthorized";
    }
  },
  Forbidden: class Unauthorized extends Error {
    public status = 403;
    
    constructor(message?: string){
      message = message || 'Forbidden'
      super(message);
      this.name = "Forbidden";
    }
  },
  NotFound: class NotFound extends Error {
    public status = 404;
    constructor(message?: string) {
      message = message || "Not Found";
      super(message);
      this.name = "NotFound";
    }
  },
}