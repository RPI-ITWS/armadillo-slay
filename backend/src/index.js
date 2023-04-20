import express from "express";
import api from "./routes/index.js"
import listEndpoints from "express-list-endpoints";

const app = express();

app.use((req, res, next) => { console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`); next(); });

app.use("/api/v1", api);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(listEndpoints(app));
});