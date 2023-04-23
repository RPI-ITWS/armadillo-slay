// routes.ts
import { Router } from 'express';
import { etlInstance } from '../../engine/etlManager';

const router = Router();


router.get('/debug', async (req, res) => {
   console.log('debug');
   res.status(200).json({ message: 'debug' });
});
router.post('/start-etl-job', async (req, res) => {
    const { state, county } = req.body;

    if(!state || !county) {
        return res.status(400).json({ message: 'State and Country are Required' });
    }

    etlInstance.startETLJob(state, county);
    res.status(200).json({ message: `ETL process started for ${state} - ${county}` });
});

router.post('/start-etl-job-all-counties', async (req, res) => {
    const { state } = req.body;

    if(!state) {
        return res.status(400).json({ message: 'State is Required' });
    }

    etlInstance.startETLJobAllCounties(state);
    res.status(200).json({ message: `ETL process started for ${state}` });
});

export default router;
