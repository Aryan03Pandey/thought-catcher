import { Route, RouteValidation } from "./types";

export const createRoute = <TRouteValidation extends RouteValidation>(
  route: Route<TRouteValidation>
): Route<TRouteValidation> => {
  return route;
};