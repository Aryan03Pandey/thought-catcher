import { UserController } from "@/controllers/user.controller";
import { Route, RouteClass } from "./types";
import { UserService } from "@/services/user.service";

export class UserRoutes implements RouteClass {
  private userController: UserController;
  constructor() {
    const service = new UserService();
    this.userController = new UserController(service);
  }

  public getRoutes(): Route[] {
    return [
      {
        method: "get",
        path: "/v1/users/auth/init",
        handler: this.userController.loginInit.bind(this.userController),
        validation: getSchemaForRoute("v1/users/auth/init"),
        isPublic: true,
      },
      {
        method: "get",
        path: "/v1/users/auth/finish",
        handler: this.userController.loginFinish.bind(this.userController),
        isPublic: true,
        validation: getSchemaForRoute("v1/users/auth/finish"),
      },
      {
        method: "post",
        path: "/v1/users/auth/setup/profile",
        handler: this.userController.profileSetup.bind(this.userController),
        validation: getSchemaForRoute("v1/users/auth/setup/profile"),
      },
      {
        method: "post",
        path: "/v1/users/auth/setup/fund",
        handler: this.userController.fundSetup.bind(this.userController),
        validation: getSchemaForRoute("v1/users/auth/setup/fund"),
      },
      {
        method: "get",
        path: "/v1/users/me",
        handler: this.userController.me.bind(this.userController),
        validation: getSchemaForRoute("v1/users/me"),
      },
    ];
  }
}