import express, { Application, Router, RequestHandler } from "express";
import router from "./routes";
import middlewares from "./middlewares";

interface AppInit {
  router: Router;
  middlewares?: Array<RequestHandler>;
}

class AppController {
  public express: Application;
  constructor({ router, middlewares }: AppInit) {
    this.express = express();

    this.middlewares(middlewares || []);
    this.routes(router);
  }

  middlewares(middlewares: Array<RequestHandler>): void {
    middlewares.forEach((middleware) => this.express.use(middleware));
  }

  routes(router: Router): void {
    this.express.use(router);
  }
}

const expressApp = (): Application => {
  const appInit: AppInit = {
    router,
    middlewares,
  };
  const app: AppController = new AppController(appInit);
  return app.express;
};

export default expressApp();
