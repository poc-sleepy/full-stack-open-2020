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

// interface exerciseParams {
//   target: number;
//   hours: Array<number>;
// }

// const parseExerciseArguments = (args: Array<string>): exerciseParams => {
//   if (args.length < 4) {
//     throw new Error(
//       'calculateExercises needs more than 1 argument. target hours per day and exercise hours.'
//     );
//   }
//   const target = Number(args[2]);
//   const hours = args.slice(3).map((str) => Number(str));
//   if (!isNaN(target) && hours.filter((num) => isNaN(num)).length === 0) {
//     return { target, hours };
//   } else {
//     throw new Error('Arguments must be Number.');
//   }
// };

const rateTrainingAverage = (
  averageDailyHour: number,
  targetDailyHour: number
): RateResult => {
  if (targetDailyHour <= 0) {
    throw new Error('target hours must be Positive Number.');
  }
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
    return { rating: 0, ratingDescription: 'Can\'t Jadge' };
  }
};

const calculateExercises = (
  exercisesHours: Array<number>,
  targetDailyHour: number
): ResultObject => {
  if (exercisesHours.length <= 0) {
    throw new Error('Array of exercise hours has no children.');
  }
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

// const { target, hours } = parseExerciseArguments(process.argv);
// console.log(calculateExercises(hours, target));

export default calculateExercises;
