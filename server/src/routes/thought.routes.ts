import { ThoughtController } from "@/controllers/thought.controller";
import { Route, RouteClass } from "./types";
import { ThoughtService } from "@/services/thought.service";
import { getSchemaForRoute } from "@thoughts/validation";

export class ThoughtRoutes implements RouteClass {
  private thoughtController: ThoughtController;
  constructor() {
    const service = new ThoughtService();
    this.thoughtController = new ThoughtController(service);
  }

  public getRoutes(): Route<any>[] {
    return [
     {
       method: "get",
       path: "/v1/thought",
       handler: this.thoughtController.all.bind(this.thoughtController),
       validation: getSchemaForRoute("v1/thought"),
     },
     {
       method: "get",
       path: "/v1/thought/:id",
       handler: this.thoughtController.id.bind(this.thoughtController),
       validation: getSchemaForRoute("v1/thought/:id.get"),
     },
     {
       method: "post",
       path: "/v1/thought/create",
       handler: this.thoughtController.create.bind(this.thoughtController),
       validation: getSchemaForRoute("v1/thought/create"),
     },
     {
       method: "delete",
       path: "/v1/thought/:id",
       handler: this.thoughtController.delete.bind(this.thoughtController),
       validation: getSchemaForRoute("v1/thought/:id.delete"),
     }
    ];
  }
}