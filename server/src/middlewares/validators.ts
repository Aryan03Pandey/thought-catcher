import { RouteValidation } from "@/routes/types";
import { asyncHandler } from "@/utils";
import { RequestHandler } from "express";

export const validate = (validation: RouteValidation): RequestHandler => {
  return asyncHandler((req, res, next) => {
    if (validation.params) {
      const params = validation.params.parse(req.params);
      req.params = params;
    }
    if (validation.query) {
      const query = validation.query.parse(req.query);
      req.query = query;
    }
    if (validation.body) {
      const body = validation.body.parse(req.body);
      req.body = body;
    }

    if (validation.response) {
      const resJson = res.json;
      res.json = (body) => {
        const isSuccessful = res.statusCode >= 200 && res.statusCode < 300;
        if (!isSuccessful) return resJson.apply(res, [body]);
        const response = validation.response!.safeParse(body);
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