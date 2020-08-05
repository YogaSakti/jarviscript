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

  public async play(uri: string) {
    try {
      const filename = await this.mpv.getProperty("filename");
      if (filename) return this.mpv.play();
    } catch (error) {
      return this.replaceSongAndPlay(uri);
    }
  }

  public async pause() {
    return this.mpv.pause();
  }

  public async replaceSongAndPlay(uri: string): Promise<MPV> {
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

  public async sameAsCurrent(filename: string | Array<string | undefined>) {
    const current = await this.mpv.getFilename();
    if (filename instanceof Array) return filename.includes(current);
    return current == filename;
  }

  public async checkPlaying() {
    return !this.mpv.getProperty("core-idle");
  }
}
