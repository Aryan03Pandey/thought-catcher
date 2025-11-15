import { z } from "zod";
import { ROUTE_VALIDATIONS } from "./route-validation";
export type RoutePaths = keyof typeof ROUTE_VALIDATIONS;

export const getSchemaForRoute = <T extends RoutePaths>(
  path: T
): (typeof ROUTE_VALIDATIONS)[T] => {
  return ROUTE_VALIDATIONS[path];
};

export type GetSchemaType<T extends RoutePaths> = ReturnType<
  typeof getSchemaForRoute<T>
>;

export type GetSchemaBodyType<T extends RoutePaths> = GetSchemaType<T> extends {
  body: infer U;
}
  ? U extends z.ZodType<infer V>
    ? V
    : never
  : never;
export type GetSchemaResponseType<T extends RoutePaths> =
  GetSchemaType<T> extends {
    response: infer U;
  }
    ? U extends z.ZodType<infer V>
      ? V
      : never
    : never;
export type GetSchemaParamsType<T extends RoutePaths> =
  GetSchemaType<T> extends {
    params: infer U;
  }
    ? U extends z.ZodType<infer V>
      ? V
      : never
    : never;

export type GetSchemaQueryType<T extends RoutePaths> =
  GetSchemaType<T> extends {
    query: infer U;
  }
    ? U extends z.ZodType<infer V>
      ? V
      : never
    : never;