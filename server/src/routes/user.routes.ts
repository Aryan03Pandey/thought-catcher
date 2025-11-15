import { UserController } from "@/controllers/user.controller";
import { Route, RouteClass } from "./types";
import { UserService } from "@/services/user.service";
import { getSchemaForRoute } from "@thoughts/validation";

export class UserRoutes implements RouteClass {
  private userController: UserController;
  constructor() {
    const service = new UserService();
    this.userController = new UserController(service);
  }

  public getRoutes(): Route<any>[] {
    return [
      {
        method: "post",
        path: "/v1/auth/login",
        handler: this.userController.login.bind(this.userController),
        validation: getSchemaForRoute("v1/auth/login"),
        isPublic: true,
      },
      {
        method: "post",
        path: "/v1/auth/refresh",
        handler: this.userController.refresh.bind(this.userController),
        validation: getSchemaForRoute("v1/auth/refresh"),
        isPublic: true,
      },
      {
        method: "post",
        path: "/v1/auth/logout",
        handler: this.userController.logout.bind(this.userController),
        validation: getSchemaForRoute("v1/auth/logout"),
      },
      {
        method: 'get',
        path: '/v1/check',
        handler: this.userController.check.bind(this.userController),
        // validation: getSchemaForRoute("v1/auth/check"),
      },
      {
        method: "get",
        path: "/v1/auth/me",
        handler: this.userController.me.bind(this.userController),
        validation: getSchemaForRoute("v1/auth/me"),
      },
      {
        method: "delete",
        path: "/v1/auth/delete",
        handler: this.userController.deleteProfile.bind(this.userController),
        validation: getSchemaForRoute("v1/auth/delete"),
      },
      
      {
        method: "post",
        path: "/v1/auth/update",
        handler: this.userController.update.bind(this.userController),
        validation: getSchemaForRoute("v1/auth/update"),
      }
    ];
  }
}