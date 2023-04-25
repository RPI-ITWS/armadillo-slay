import { config } from "../config";
import { newMongoConnection } from "../db";

class DataLoader {
    async loadTransformedDataToDB(data: any) {
        const client = await newMongoConnection();
        const db = client.db(config.ETL_DB_NAME);
        const collection = db.collection(config.ETL_COLLECTION_NAME);
        await collection.insertOne(data);
    }
}

export { DataLoader };
