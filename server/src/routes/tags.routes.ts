import { TagsController } from "@/controllers/tags.controller";
import { Route, RouteClass } from "./types";
import { TagsService } from "@/services/tags.service";

export class TagsRoutes implements RouteClass {
  private tagsController: TagsController;
  constructor() {
    const service = new TagsService();
    this.tagsController = new TagsController(service);
  }

  public getRoutes(): Route[] {
    return [
      {
        method: "get",
        path: "/v1/tags",
        handler: this.tagsController.all.bind(this.tagsController),
        // validation: getSchemaForRoute("v1/users/auth/init"),
      },
      {
        method: "post",
        path: "/v1/tags/create",
        handler: this.tagsController.create.bind(this.tagsController)
      },
      {
        method: "delete",
        path: "/v1/tags/:id",
        handler: this.tagsController.delete.bind(this.tagsController)
      },
    ];
  }
}