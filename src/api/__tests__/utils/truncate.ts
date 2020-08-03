import User from "../../models/User";
import Player from "../../models/music/Player";
import Playlist from "../../models/music/Playlist";
export default async () => {
  await User.deleteMany({});
  await Player.deleteMany({});
  await Playlist.deleteMany({});
};
