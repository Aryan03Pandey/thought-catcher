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
        method: "post",
        path: "/v1/auth/login",
        handler: this.userController.login.bind(this.userController),
        // validation: getSchemaForRoute("v1/users/auth/init"),
        isPublic: true,
      },
      {
        method: "post",
        path: "/v1/auth/refresh",
        handler: this.userController.refresh.bind(this.userController),
        isPublic: true,
      },
      {
        method: "post",
        path: "/v1/auth/logout",
        handler: this.userController.logout.bind(this.userController),
        // isPublic: false
      },
      {
        method: 'get',
        path: '/v1/check',
        handler: this.userController.check.bind(this.userController),
        // validation: 
      },
      {
        method: "get",
        path: "/v1/auth/me",
        handler: this.userController.me.bind(this.userController),
        // validation: getSchemaForRoute("v1/users/me"),
      },
      {
        method: "post",
        path: "/v1/auth/update",
        handler: this.userController.update.bind(this.userController),
        // validator: getSchemaForRoute("v1/users/update")
      }
    ];
  }
}