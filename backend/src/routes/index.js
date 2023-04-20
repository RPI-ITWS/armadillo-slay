import info from './info/index.js';
import etl from './etl/index.js';
import health from './health/index.js';
import control from './control/index.js';
import {Router} from "express";

const router = Router();

router.use("/control", control);
router.use("/info", info);
router.use("/etl", etl)
router.use("/health", health)

export default router;