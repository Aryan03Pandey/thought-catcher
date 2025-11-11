import { Request, RequestHandler } from "express";
import { HTTPMethod } from "@/types";
import { ZodObject, z, ZodRawShape } from "zod";

export interface RouteClass {
  getRoutes(): Route[];
}

export type RouteValidation <
  Body extends ZodObject<any> | undefined = undefined,
  Query extends ZodObject<any> | undefined = undefined,
  Params extends ZodObject<any> | undefined = undefined,
  Response extends ZodObject<any> | undefined = undefined
> = {
  body?: Body;
  query?: Query;
  params?: Params;
  response?: Response;
};

export type Route<Validation extends RouteValidation = RouteValidation> =
  | {
    routes?: never;
    path: string;
    method: HTTPMethod;
    handler: RequestHandler<
        Validation["params"] extends ZodObject<any>
          ? z.infer<Validation["params"]>
          : Record<string, string>,
        Validation["response"] extends ZodObject<any>
          ? z.infer<Validation["response"]>
          : any,
        Validation["body"] extends ZodObject<any>
          ? z.infer<Validation["body"]>
          : any,
        Validation["query"] extends ZodObject<any>
          ? z.infer<Validation["query"]>
          : Record<string, any>
      >;
      middlewares?: RequestHandler[];
      validation?: Validation;
      isPublic?: boolean;
    }
  | {
      routes: Route<RouteValidation>[];
      path: string;
      middlewares?: RequestHandler[];
      isPublic?: boolean;
    };