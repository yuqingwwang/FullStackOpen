import express from 'express';
import diagnosesRouter from './src/routes/diagnoses';
import diagnosisService from './src/services/diagnosisService';
import patientService from './src/services/patientService';
import patientsRouter from './src/routes/patients';

import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions ={
  origin:'http://localhost:5173',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};

app.use(cors(corsOptions));

const PORT = 3000;

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnosisService.getEntries());
});

app.get('/api/patients', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
