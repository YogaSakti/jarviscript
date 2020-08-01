import mongoose from "mongoose";
const host: string = process.env.DB_HOST || "localhost";
const port: string = process.env.DB_PORT || "27017";
const user: string = process.env.DB_USER || "";
const pass: string = process.env.DB_PASS || "";
const name: string = process.env.DB_NAME || "jarviscript";
const node_env: string = process.env.NODE_ENV || "";

export default {
  host,
  port,
  user,
  pass,
  name,
};

export async function databaseSetup() {
  let auth: string = "";
  if (user && pass) auth = `${user}:${pass}@`;

  const uri: string = `mongodb://${auth}${host}:${port}/${name}${node_env}`;
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
