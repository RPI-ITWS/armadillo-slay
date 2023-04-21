import { MongoClient } from 'mongodb';
import { config } from "../config/index.js";

async function newMongoConnection() {
  const url = config.MONGO_URI;
  if (!url) {
    throw new Error("MONGO_URL not defined in env");
  }

  const options = {
    useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1

  };

  const client = await MongoClient.connect(url, options);
  return client


}


export {
  newMongoConnection
}
