import * as express from "express";
import {router as api} from "./routes/index.js"
import * as listEndpoints from "express-list-endpoints";

function main(args: string[]){

  const app = express();

  app.use(express.json());

  app.use((req, res, next) => { console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`); next(); });

  app.use("/api/v1", api);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(listEndpoints(app));
  });
}

main(process.argv.slice(2));