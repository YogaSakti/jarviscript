import mongoose, { Schema, Document } from "mongoose";
import { IPlaylist } from "./Playlist";
import { SongSchema, ISong } from "./Song";

export interface IPlayer extends Document {
  is_playing: boolean;
  is_stopped: boolean;
  playlist_loadded?: IPlaylist;
  songs: Array<ISong>;
  current_index: number;
  autoplay: boolean;
}

const PlayerSchema: Schema = new Schema({
  is_playing: Boolean,
  is_stopped: Boolean,
  playlist_loadded: {
    type: Schema.Types.ObjectId,
    ref: "Playlist",
  },
  songs: [SongSchema],
  current_index: {
    type: Number,
    default: 0,
    required: true,
  },
  autoplay: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model<IPlayer>("Player", PlayerSchema);
