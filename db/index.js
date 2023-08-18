import { connect } from "mongoose";
import appConfig from "../src/config/app.config.js";

const mongoConnect = async () => {
  try {
    const connection = await connect(appConfig.MONGO_URL);
    console.log("Connected to mongoDB");
    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default mongoConnect;
