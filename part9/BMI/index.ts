import express from 'express';
import  calculateBmi  from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json())

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
  console.log(req.body)
  const dailyExercises = req.body.daily_exercises;
  const dailyTarget = req.body.target;

  if (!dailyExercises || !dailyTarget) {
    return res.status(400).json({ error: 'Missing parameter daily_exercises or target' });
  }

  const parsedTarget = Number(dailyTarget);
  if (isNaN(parsedTarget)) {
    return res.status(400).json({ error: 'Invalid target value' });
  }

  const parsedHours = dailyExercises.map(Number);
  if (parsedHours.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid daily exercise values' });
  }

  const result = calculateExercises(parsedHours, parsedTarget);
  res.json(result);
  return
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
