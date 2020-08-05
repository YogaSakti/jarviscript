import express, { Application, Router, RequestHandler } from "express";
import router from "./routes";
import middlewares from "./middlewares";
import { databaseSetup } from "./database/config";
import MPV from "./services/PlayerService/MPV";
import Whatsapp from "./services/WhatsappService/Whatsapp";

interface AppInit {
  router: Router;
  middlewares?: Array<RequestHandler>;
}

class AppController {
  public app: Application;
  public MPV: MPV;
  public Whatsapp: Whatsapp;
  public socket: any;

  constructor({ router, middlewares }: AppInit) {
    this.app = express();
    this.MPV = new MPV();
    this.Whatsapp = new Whatsapp();

    this.middlewares(middlewares || []);
    this.routes(router);
    databaseSetup();
  }

  middlewares(middlewares: Array<RequestHandler>): void {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  routes(router: Router): void {
    this.app.use(router);
  }
}

const expressApp = (): AppController => {
  const appInit: AppInit = {
    router,
    middlewares,
  };
  const appController: AppController = new AppController(appInit);

  return appController;
};

export default expressApp();
