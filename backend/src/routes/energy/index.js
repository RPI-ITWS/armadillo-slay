import {validate} from "../../util/index.js";
import {Router} from "express";
import {newMongoConnection} from "../../db/index.js";
import {config} from "../../config/index.js";
const collection = newMongoConnection().then(client => {
    return client.db(config.INFO_DB_NAME).collection(config.INFO_COLLECTION_NAME);
});


const router = Router();

router.get("/:state/:county", async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];

    const query = validate(county, state)
        ? {county: county, state: state}
        : () => {
            throw new Error("Invalid query")
        };

    const data = (await collection).find(query).toArray();

    if (data && (await data).length === 0) {
        return res.json({error: "No data found"});
    }

    res.json(data);
});

router.post("/:state/:county", async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];

    const query = validate(county, state)
        ? {county, state}
        : () => {
            throw new Error("Invalid query")
        };

    if( req.body && req.body.length === 0) {
        return res.json({error: "No data found"});
    }

    try{

        let _id = Math.random().toString(36).substr(2, 9);

        const data = (await collection).insertOne(
            {...req.body, county, state, _id}
        );

        return res.json({success: "Data added", data});

    }catch (err) {

        return res.json({error: err.message});
    
    }
});

router.delete("/:state/:county", async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];

    validate(county, state);

    const query = {county, state};

    let data;
    try {

        data = (await collection).find(query).toArray();
    } catch (err) {
        return res.status(404).json({error: err.message})
    }

    if ((await data).length === 0) {
        return res.json({error: "No data to delete"});
    }
    const result = (await collection).deleteOne(query);
    result
        ? res.json({success: "Data deleted"})
        : res.json({error: "Data not deleted"});
});

router.put("/:state/:county", async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];

    const query = validate(county, state) ? {county, state} : () => {
        return res.json({error: "Invalid query"})
    };

    // find one query and if exists update it
    const result = (await collection).updateOne(query, {$set: req.body});

    if (!result) {
        return res.json({error: "Data not updated"});
    }

    return res.json({success: "Data updated"});
});


export default router;
