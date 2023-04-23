import energy from './energy/index.js';
import etl from './etl/index.js';
import health from './health/index.js';
import control from './control/index.js';
import {Router} from "express";

export const router = Router();

router.use("/control", control);
router.use("/energy", energy);
router.use("/etl", etl)
router.use("/health", health)
