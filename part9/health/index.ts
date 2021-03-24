import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('malformatted parameters');
    }

    res.send({
      height,
      weight,
      bmi: calculateBmi(height, weight),
    });
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
