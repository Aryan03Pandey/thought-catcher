import { Request, RequestHandler } from "express";
import { HTTPMethod } from "@/types";
import { AnyZodObject, z } from "zod";

export interface RouteClass {
  getRoutes(): Route[];
}

export type RouteValidation<
  Body extends AnyZodObject | undefined = AnyZodObject,
  Query extends AnyZodObject | undefined = AnyZodObject,
  Params extends AnyZodObject | undefined = AnyZodObject,
  Response extends AnyZodObject | undefined = AnyZodObject
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
        Validation["params"] extends AnyZodObject
          ? z.infer<Validation["params"]>
          : Request["params"],
        Validation["response"] extends AnyZodObject
          ? z.infer<Validation["response"]>
          : unknown,
        Validation["body"] extends AnyZodObject
          ? z.infer<Validation["body"]>
          : unknown,
        Validation["query"] extends AnyZodObject
          ? z.infer<Validation["query"]>
          : Request["query"]
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