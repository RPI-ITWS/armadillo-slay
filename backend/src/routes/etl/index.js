import {newMongoConnection} from '../../db/index.js';
import {Router} from "express";
import {config} from "../../config/index.js";
import { preloadDocs } from './preloadDocs.js';
import { preloadStateDocs } from './preloadStateDocs.js';
import { getNASAData } from './getNASAData.js';



const router = Router();

router.get("/debug", async (req, res) => {
    const client = await newMongoConnection()
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    const data = await collection.find({}).toArray();
    res.json(data);
})

router.get("/debug/:state/:county", async (req, res) => {
    const client = await newMongoConnection()
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    const data = await collection.find({state: req.params["state"], county: req.params["county"]}).toArray();
    res.json(data);
});

router.get('/debug/preload-docs', async (req, res) => {
    const client = await newMongoConnection()
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    let data2 = await preloadStateDocs()
    await collection.insertMany(data2);
    let data = await preloadDocs()
    await collection.insertMany(data);
    res.json({success: "Data loaded"});
})

router.get('/debug/add-data/:state/:county', async (req, res) => {

    console.log("state: " + req.params["state"]);
    console.log("county: " + req.params["county"]);

    const client = await newMongoConnection()
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    let nasaData;
    try {
        nasaData = await getNASAData(req.params["state"], req.params["county"]);
    } catch (e) {
        console.log(e);
    }

    if (!nasaData) {
        return res.json({error: "Error getting data"});
    }
    let _id = Math.random().toString(36).substring(2, 15)
    let dbResponse = await collection.insertOne({_id, ...nasaData});
    if (!dbResponse) {
        return res.json({error: "Error inserting data"});
    }
    return res.json({success: "Data loaded"});
});


export default router;