import { Route } from "./types";
import { UserRoutes } from "./user.routes";

const routeFactories = [
  new UserRoutes(),
];

const routes: Route[] = routeFactories.reduce((acc, factory) => {
  return [...acc, ...factory.getRoutes()];
}, [] as Route[]);

export default routes;