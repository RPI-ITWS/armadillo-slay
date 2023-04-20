import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
import {config} from "../config/index.js";

function newMongoConnection() {
  const url = config.MONGO_URI;
  if(!url) {
    throw new Error("MONGO_URL not defined in env");
  }

  const options = {

  };

  return  MongoClient.connect(url, options);


}


export {
  newMongoConnection
}
