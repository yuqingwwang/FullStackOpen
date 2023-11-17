import express from 'express';
import diagnosisService from '../services/diagnosisService';
import { toNewDiagnosisEntry } from '../utils';

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

router.post('/:id/entries', (_req, res) => {
  const newDiagnosisEntry = toNewDiagnosisEntry(_req.body);
  const addedEntry = diagnosisService.addEntry(newDiagnosisEntry);
  res.json(addedEntry);
}
);

export default router;
