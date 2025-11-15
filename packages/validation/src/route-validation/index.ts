import { z } from "zod";
import auth from "./routes/auth"
import thoughtbox from "./routes/thoughtbox";
import tags from "./routes/tags";
import thought from "./routes/thought";

type RouteValidation = {
  body?: z.ZodType<any>;
  response?: z.ZodType<any>;
  params?: z.ZodType<any>;
  query?: z.ZodType<any>;
};


export const ROUTE_VALIDATIONS = {
  ...auth,
  ...thoughtbox,
  ...thought,
  ...tags,
} satisfies Record<string, RouteValidation>;