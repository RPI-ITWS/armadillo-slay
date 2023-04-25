import { validate } from "../../util/index.js";
import { Router } from "express";
import { newMongoConnection } from "../../db/index.js";
import { config } from "../../config/index.js";
const collection = newMongoConnection().then(client => {
    return client.db(config.INFO_DB_NAME).collection(config.INFO_COLLECTION_NAME);
});


const router = Router();

router.get("/:state", async (req, res) => {
    const client = await newMongoConnection()
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    let state = req.params["state"];
    try {
        const stateData = await collection
            .find({ state: state, EIA_data: { $exists: true } })
            .toArray();
        const countyData = await collection
            .find({ state: state, EIA_data: { $exists: false } })
            .toArray();

        if (stateData.length === 0 && countyData.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }

        res.json({ state_data: stateData, county_data: countyData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
});

router.get("/info/:state/counties", async (req, res) => {
    const client = await newMongoConnection();
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    try {
        let state = req.params["state"];

        const query = { state: state, EIA_data: { $exists: false } };
        const data = await collection.find(query).toArray();

        const countyNames = data.map(item => item.county);

        if (countyNames.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }

        res.json(countyNames);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
});

router.get("/info/states", async (req, res) => {
    const client = await newMongoConnection();
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    try {
        const query = { EIA_data: { $exists: true } };
        const data = await collection.find(query).toArray();

        const stateNames = data.map(item => item.state);

        if (stateNames.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }

        res.json(stateNames);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
});


router.get("/info/power_params", async (req, res) => {
    const client = await newMongoConnection();
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    try {
        const query = { EIA_data: { $exists: false } }
        const data = await collection.findOne(query);
        const powerData = data["NASA_power_data"];
        const powerParams = Object.keys(powerData);
        if (powerParams.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }
        res.json(powerParams);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An error occurred while processing the request" });

    }
})

router.get("/:state/:county", async (req, res) => {
    const client = await newMongoConnection();
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    let state = req.params["state"];
    let county = req.params["county"];

    if (req.query["params"]) {
        let params = req.query["params"].split(",");
        const query = validate(county, state)
            ? { county, state }
            : () => {
                throw new Error("Invalid query")
            }

        try {
            const data = await (await collection).findOne(query);

            if (!data) {
                return res.status(404).json({ error: "No data found" });
            }

            const nasaData = data["NASA_power_data"];
            const filteredData = {};
            params.forEach(param => {
                filteredData[param] = nasaData[param];
            })
            data["NASA_power_data"] = filteredData;
            res.json(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "An error occurred while processing the request" });
        }
    } else {

        const query = validate(county, state)
            ? { county, state }
            : () => {
                throw new Error("Invalid query")
            }

        try {
            const data = await (await collection).findOne(query);

            if (!data) {
                return res.status(404).json({ error: "No data found" });
            }

            res.json(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "An error occurred while processing the request" });
        }

    }
});

router.post("/:state/:county", async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];

    const query = validate(county, state)
        ? { county, state }
        : () => {
            throw new Error("Invalid query")
        };

    if (req.body && req.body.length === 0) {
        return res.json({ error: "No data found" });
    }

    try {

        let _id = Math.random().toString(36).substr(2, 9);

        const data = (await collection).insertOne(
            { ...req.body, county, state, _id }
        );

        return res.json({ success: "Data added", data });

    } catch (err) {

        return res.json({ error: err.message });

    }
});

router.delete("/:state/:county", async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];

    validate(county, state);

    const query = { county, state };

    let data;
    try {

        data = (await collection).find(query).toArray();
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }

    if ((await data).length === 0) {
        return res.json({ error: "No data to delete" });
    }
    const result = (await collection).deleteOne(query);
    result
        ? res.json({ success: "Data deleted" })
        : res.json({ error: "Data not deleted" });
});

router.put("/:state/:county", async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];

    const query = validate(county, state) ? { county, state } : () => {
        return res.json({ error: "Invalid query" })
    };

    // find one query and if exists update it
    const result = (await collection).updateOne(query, { $set: req.body });

    if (!result) {
        return res.json({ error: "Data not updated" });
    }

    return res.json({ success: "Data updated" });
});


export default router;
