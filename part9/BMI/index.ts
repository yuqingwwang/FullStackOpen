import express from 'express';
import  calculateBmi  from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  if (height <= 0 || weight <= 0) {
    return res.status(400).json({ error: 'invalid input' });
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi: bmi,
  });
  return;
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const hours = daily_exercises.map((h: number) => Number(h));
  const t = Number(target);
  const result = calculateExercises(hours, t);
  res.send({ result });
  // res.json(result);
  return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
