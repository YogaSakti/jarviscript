import mongoose, { Schema, Document } from "mongoose";
import { SongSchema, ISong } from "./Song";

export interface IPlaylist extends Document {
  name: string;
  qtd: number;
  songs: Array<ISong>;
  created_by: string;
}

const PlaylistSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [SongSchema],
  created_by: String,
});

export default mongoose.model<IPlaylist>("Playlist", PlaylistSchema);
