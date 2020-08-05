import config from "./config";
import MPVError from "./MPVError";
const mpvAPI = require("node-mpv");
import { registerEvents } from "./MPVEvents";

export default class MPV {
  private mpv: any;

  constructor() {
    const mpv = new mpvAPI(config);
    this.init(mpv);
  }

  private async init(mpv: any) {
    await mpv.start(["--keep-open"]);
    registerEvents(mpv);
    this.mpv = mpv;
  }

  public async replaceSong(uri: string): Promise<MPV> {
    try {
      await this.mpv.load(uri, "replace");
      await this.mpv.play();
      return this;
    } catch (error) {
      throw new MPVError(error);
    }
  }

  public async isRunning(): Promise<boolean> {
    return await this.mpv.isRunning();
  }

  public async sameAsCurrent(filename: string = "nonexiste") {
    return (await this.mpv.getFilename()) == filename;
  }
}
