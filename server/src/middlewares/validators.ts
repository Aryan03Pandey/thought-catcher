import { RouteValidation } from "@/routes/types";
import { asyncHandler } from "@/utils";
import { RequestHandler } from "express";
import { ZodObject } from "zod";

export const validate = <V extends RouteValidation>(
  validation: V
): RequestHandler => {
  return asyncHandler((req, res, next) => {
    if (validation.params) {
      const schema = validation.params as ZodObject<any>;
      const params = schema.parse(req.params);
      req.params = params as any;
    }
    if (validation.query) {
      const schema = validation.query as ZodObject<any>;
      const query = schema.parse(req.query);
      req.query = query as any;
    }
    if (validation.body) {
      const schema = validation.body as ZodObject<any>;
      const body = schema.parse(req.body);
      req.body = body;
    }
    if (validation.response) {
      const responseSchema = validation.response as ZodObject<any>;
      const resJson = res.json;
      res.json = (body) => {
        const isSuccessful = res.statusCode >= 200 && res.statusCode < 300;
        if (!isSuccessful) return resJson.apply(res, [body]);
        const response = responseSchema.safeParse(body);
        if (!response.success) {
          console.error(`Error validating response body for ${req.path}`);
          console.error(response.error);
          throw new Error("Invalid response body");
        }
        return resJson.apply(res, [response.data]);
      };
    }
    next();
  });
};