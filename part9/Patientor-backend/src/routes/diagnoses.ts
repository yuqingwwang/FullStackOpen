import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching all diagnoses!');
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

router.get('/:id', (_req, res) => {
  const diagnosis = diagnosisService.findById(_req.params.id);
  if(diagnosis){
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
});

export default router;
