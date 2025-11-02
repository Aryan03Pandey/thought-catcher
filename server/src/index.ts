import * as dotenv from "dotenv";
dotenv.config();

import routes from "@/routes";
import Server from "@/server";
import { auth, errorHandler } from "@/middlewares";
import env from "./env";

const server = new Server({
  routes,
  useJSON: true,
  urlEncoded: true,
  port: 4000,
  middlewares: {
    auth,
    errorHandler,
  },
  corsOptions: {
    origin: env.frontend_url,
    credentials: true,
  },
});

server.start();