import express from 'express';
import diagnosesRouter from './src/routes/diagnoses';
import diagnosisService from './src/services/diagnosisService';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnosisService.getEntries());
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
