import mongoose, { Schema, Document } from "mongoose";

export interface ISong extends Document {
  title: string;
  artist?: string;
  youtube_url?: string;
  stream_url?: string;
  cover?: string;
}

export const SongSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: String,
  youtube_url: String,
  stream_url: String,
  cover: String,
});

export default mongoose.model<ISong>("Song", SongSchema);
