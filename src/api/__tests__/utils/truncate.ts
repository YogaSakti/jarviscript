// import { databaseSetup } from "../../database/config";
import User from "../../models/User";
export default async () => {
  // let mongo = await databaseSetup();
  await User.deleteMany({});
  // mongo.disconnect();
};
