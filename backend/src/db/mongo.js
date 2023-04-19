// goal: export a function that connects to the database and returns a connection object

import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default async function connectToDatabase() {
  const url = process.env.MONGO_URL;

  if(!url) {
    throw new Error("MONGO_URL not defined in env");
  }

  const options = {

  };

  return await MongoClient.connect(url, options);


}
