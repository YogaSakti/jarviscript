// https://github.com/j-holub/Node-MPV

const mpvAPI = require("node-mpv");

const mpvOptions = {
  audio_only: true,
  auto_restart: true,
  binary: null,
  debug: true,
  ipcCommand: null,
  time_update: 1,
  verbose: true,
};
const mpv = new mpvAPI(mpvOptions);

async function main() {
  try {
    await mpv.start();
    // loads a file
    await mpv.load("https://www.youtube.com/watch?v=fU7hZ3smj0g");
    // file is playing
    // sets volume to 70%
    await mpv.volume(70);
  } catch (error) {
    // handle errors here
    console.log(error);
  }
}

main();
