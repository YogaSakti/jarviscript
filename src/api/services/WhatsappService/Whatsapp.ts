const wppAPI = require("@open-wa/wa-automate");
import { registerEvents } from "./WhatsappEvents";

export default class Whatsapp {
  public wpp: any;

  constructor() {
    this.init();
  }

  private async init() {
    const client = await wppAPI.create();
    registerEvents(client);

    this.wpp = client;
  }
}
