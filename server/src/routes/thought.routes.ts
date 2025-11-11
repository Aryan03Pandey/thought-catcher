import { ThoughtController } from "@/controllers/thought.controller";
import { Route, RouteClass } from "./types";
import { ThoughtService } from "@/services/thought.service";

export class ThoughtRoutes implements RouteClass {
  private thoughtController: ThoughtController;
  constructor() {
    const service = new ThoughtService();
    this.thoughtController = new ThoughtController(service);
  }

  public getRoutes(): Route[] {
    return [
     {
       method: "get",
       path: "/v1/thought",
       handler: this.thoughtController.all.bind(this.thoughtController)
     },
     {
       method: "get",
       path: "/v1/thought/:id",
       handler: this.thoughtController.id.bind(this.thoughtController),
     },
     {
       method: "post",
       path: "/v1/thought/create",
       handler: this.thoughtController.create.bind(this.thoughtController),
     },
     {
       method: "delete",
       path: "/v1/thought/:id",
       handler: this.thoughtController.delete.bind(this.thoughtController)
     }
    ];
  }
}