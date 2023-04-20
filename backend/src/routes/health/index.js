import {Router} from "express";
import exp from "constants";

const router = Router();

router.get("/", (req, res) => {
    res.json({status: "ok"})
});

export default router;