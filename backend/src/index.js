import express from "express";
import api from "./routes/index.js"

const app = express();

app.use("/api/v1", api);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
