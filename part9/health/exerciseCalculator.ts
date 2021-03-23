interface RateResult {
  rating: number;
  ratingDescription: string;
}

interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const rateTrainingAverage = (
  averageDailyHour: number,
  targetDailyHour: number
): RateResult => {
  const param = averageDailyHour / targetDailyHour;
  if (param < 0.5) {
    return { rating: 1, ratingDescription: 'too bad' };
  } else if (param < 1.0) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' };
  } else if (param < 1.2) {
    return { rating: 3, ratingDescription: 'good' };
  } else if (param < 1.5) {
    return { rating: 4, ratingDescription: 'nice' };
  } else if (param >= 1.5) {
    return { rating: 5, ratingDescription: 'GREAT' };
  } else {
    return { rating: 0, ratingDescription: "Can't Jadge" };
  }
};

const calculateExercises = (
  exercisesHours: Array<number>,
  targetDailyHour: number
): ResultObject => {
  const periodLength = exercisesHours.length;
  const trainingDays = exercisesHours.filter((hours) => hours !== 0).length;
  const average =
    exercisesHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const target = targetDailyHour;
  const success = average >= target;
  const { rating, ratingDescription } = rateTrainingAverage(average, target);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
