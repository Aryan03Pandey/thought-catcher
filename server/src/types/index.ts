import { ErrorRequestHandler, RequestHandler } from "express";
import { Route } from "@/routes/types";
import type { CorsOptions } from "cors";

export type HTTPMethod = "get" | "post" | "put" | "delete";

export interface IServer {
  start(port: number): void;
}

export interface IServerConfig {
  port?: number;
  routes: Route[];
  useJSON: boolean;
  urlEncoded: boolean;
  middlewares: {
    auth: RequestHandler;
    errorHandler: ErrorRequestHandler;
  };
  corsOptions: CorsOptions;
}