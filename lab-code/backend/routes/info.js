import { collection } from "../db/mongo";
import { validate } from "../util";
import { addData } from "../controllers/add-data";
const { Router } = require("express");

const router = Router();

router.get("/:state/:county", async (req, res) => {
  let state = req.params["state"];
  let county = req.params["county"];

  const query = validate(county, state)
    ? { county: county, state: state }
    : throw new Error("Invalid query");

  const data = await collection.find(query).toArray();

  if (data && data.length === 0) {
    res.json({ error: "No data found" });
  }

  res.json(data);
});

router.post("/:state/:county", async (req, res) => {
  let state = req.params["state"];
  let county = req.params["county"];

  const query = validate(county, state)
    ? { county: county, state: state }
    : throw new Error("Invalid query");

  const data = collection.find(query).toArray();
  if (data.length === 0) {
    let data = await addData(county, state);
    res.json({ success: "Data added", data });
  }

  res.json({ error: "Data already exists" });
});

router.delete("/:state/:county", async (req, res) => {
  let state = req.params["state"];
  let county = req.params["county"];

  validate(county, state);

  const query = { county: county, state: state };

  const data = await collection.find(query).toArray();
  if (data.length === 0) {
    res.json({ error: "No data to delete" });
  }
  const result = await collection.deleteOne(query);
  result
    ? res.json({ success: "Data deleted" })
    : res.json({ error: "Data not deleted" });
});

router.put("/:state/:county", async (req, res) => {
  let state = req.params["state"];
  let county = req.params["county"];

  validate();

  const query = { county: county, state: state };
  const data = collection.find(query).toArray();

  if (data.length === 0) {
    res.json({ error: "No data to update" });
  } else {
    const result = await collection.deleteOne(query);
    addData(county, state);
    res.json({ success: "Data updated" });
  }
});
