import express from 'express';
import {Request, Response} from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send({ error: String(e.message) });
  }
});

app.post('/exercises', (req: Request, res:Response) => {
  try {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (daily_exercises === undefined || target === undefined) {
      throw new Error('parameters missing');
    }
    if (!Array.isArray(daily_exercises)) {
      throw new Error('malformatted parameters');
    }

    const target_num = Number(target);
    const daily_exercises_num = daily_exercises.map((str) => Number(str));
    if (
      isNaN(target_num) ||
      daily_exercises_num.filter((num) => isNaN(num)).length !== 0
    ) {
      throw new Error('malformatted parameters');
    }

    res.json(calculateExercises(daily_exercises_num, target_num));
  } catch (e) {
    res.status(400).send({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error: String(e.message),
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
