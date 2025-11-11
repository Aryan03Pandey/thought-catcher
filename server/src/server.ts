import express from "express";
import cors from "cors";
import { IServer, IServerConfig } from "./types";
import { Route } from "@/routes/types";
import { validate } from "@/middlewares";
import { asyncHandler } from "./utils";
import { connectDatabase } from "./db";

class Server implements IServer {
  private app: express.Application;
  private routes: Route[];
  private port: number;
  private config: IServerConfig;

  constructor(config: IServerConfig) {
    this.app = express();
    this.routes = config.routes;
    this.port = config.port || 3000;
    this.config = config;
  }

  private setupRoutes(routes?: Route[]): void {
    routes = routes || this.routes;
    routes.forEach((route) => {
      if (route.routes) {
        this.setupRoutes(route.routes);
        return;
      }
      const middlewares = route.middlewares || [];

      if (!route.isPublic) {
        middlewares.push(this.config.middlewares.auth);
      }
      if (route.validation) {
        middlewares.push(validate(route.validation));
      }
      const API_PREFIX = "/api";
      this.app[route.method](
        `${API_PREFIX}${route.path}`,
        ...middlewares,
        asyncHandler(route.handler)
      );
    });
  }
  public async start(port?: number): Promise<void> {
    if (port) this.port = port;
    
    await connectDatabase();

    if (this.config.useJSON) this.app.use(express.json());
    if (this.config.urlEncoded)
      this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors(this.config.corsOptions));

    this.setupRoutes();

    this.app.use(this.config.middlewares.errorHandler);

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
