import {MONGO_URI} from "../config";
import {MongoClient, ServerApiVersion} from "mongodb";

const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});
const mongo = client.db("Lab6");
const collection = mongo.collection("NASA Data");
process.on('SIGINT', async () => {
    console.log("Closing Connection to MongoDB");
    await client.close();
    console.log("MongoDB Connection Closed");
});

export {
    mongo,
    collection,
    client,
}