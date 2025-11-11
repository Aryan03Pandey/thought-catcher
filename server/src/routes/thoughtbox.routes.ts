import { ThoughtBoxController } from "@/controllers/thoughtbox.controller";
import { Route, RouteClass } from "./types";
import { ThoughtBoxService } from "@/services/thoughtbox.service";

export class ThoughtBoxRoutes implements RouteClass {
  private thoughtBoxController: ThoughtBoxController;
  constructor() {
    const service = new ThoughtBoxService();
    this.thoughtBoxController = new ThoughtBoxController(service);
  }

  public getRoutes(): Route[] {
    return [
     {
       method: "get",
       path: "/v1/thoughtbox",
       handler: this.thoughtBoxController.all.bind(this.thoughtBoxController)
     },
     {
       method: "get",
       path: "/v1/thoughtbox/:id",
       handler: this.thoughtBoxController.id.bind(this.thoughtBoxController)
     },
     {
       method: "post",
       path: "/v1/thoughtbox/create",
       handler: this.thoughtBoxController.create.bind(this.thoughtBoxController)
     },
     {
       method: "delete",
       path: "/v1/thoughtbox/:id",
       handler: this.thoughtBoxController.delete.bind(this.thoughtBoxController)
     }
    ];
  }
}