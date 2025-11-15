import { ThoughtBoxController } from "@/controllers/thoughtbox.controller";
import { Route, RouteClass } from "./types";
import { ThoughtBoxService } from "@/services/thoughtbox.service";
import { getSchemaForRoute } from "@thoughts/validation";

export class ThoughtBoxRoutes implements RouteClass {
  private thoughtBoxController: ThoughtBoxController;
  constructor() {
    const service = new ThoughtBoxService();
    this.thoughtBoxController = new ThoughtBoxController(service);
  }

  public getRoutes(): Route<any>[] {
    return [
     {
       method: "get",
       path: "/v1/thoughtbox",
       handler: this.thoughtBoxController.all.bind(this.thoughtBoxController),
       validation: getSchemaForRoute("v1/thoughtbox")
     },
     {
       method: "get",
       path: "/v1/thoughtbox/:id",
       handler: this.thoughtBoxController.id.bind(this.thoughtBoxController),
       validation: getSchemaForRoute("v1/thoughtbox/:id.get")
     },
     {
       method: "post",
       path: "/v1/thoughtbox/create",
       handler: this.thoughtBoxController.create.bind(this.thoughtBoxController),
       validation: getSchemaForRoute("v1/thoughtbox/create")
     },
     {
       method: "delete",
       path: "/v1/thoughtbox/:id",
       handler: this.thoughtBoxController.delete.bind(this.thoughtBoxController),
       validation: getSchemaForRoute("v1/thoughtbox/:id.delete")
     }
    ];
  }
}