// routes.ts
import {Router} from 'express';
import {etlInstance} from '../../engine/etlManager';
const router = Router();


router.get('/debug', async (req, res) => {
    console.log('debug');
    res.status(200).json({message: 'debug'});
});

/**
 * Start ETL process for a specific state and county
 * @param state
 * @param county
 */
router.post('/start-etl-job', async (req, res) => {
    const {state, county} = req.body;

    if (!state || !county) {
        return res.status(400).json({message: 'State and Country are Required'});
    }
    etlInstance.startETLJob(state, county);
    res.status(200).json({message: `ETL process started for ${state} - ${county}`});
});

/**
 * Start ETL process for all counties in a specific state
 * @param state
 */
router.post('/start-etl-job-all-counties', async (req, res) => {
    const {state} = req.body;

    if (!state)
        return res.status(400).json({message: 'State is Required'});

    etlInstance.startETLJobAllCounties(state);
    res.status(200).json({message: `ETL process started for ${state}`});
});

/**
 * Start ETL process for all counties in all states
 * (ie run the damn thing)
 * @param state
 * @param county
 */
router.post('/run', async (req, res) => {
    const runId = etlInstance.run();
    res.status(200).json({message: 'ETL process started for all states', runId});
});

router.get('/run/:runId', async (req, res) => {
    const {runId} = req.params;
    const run = await etlInstance.getRun(runId);
    res.status(200).json(run);
});

export default router;
