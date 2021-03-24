// interface BmiParams {
//   height: number;
//   weight: number;
// }

// const parseBmiArguments = (args: Array<string>): BmiParams => {
//   if (args.length !== 4) {
//     throw new Error('calculateBmi needs 2 arguments. height and weight.');
//   }
//   const height = Number(args[2]);
//   const weight = Number(args[3]);
//   if (!isNaN(height) && !isNaN(weight)) {
//     return { height, weight };
//   } else {
//     throw new Error('Arguments must be Number.');
//   }
// };

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error('height and weight must be Positive Number.');
  }
  const bmi: number = (weight / height / height) * 10000;
  if (bmi < 18.5) {
    return `Thinness (Under weight): ${bmi}`;
  } else if (bmi < 25) {
    return `Normal (healthy weight): ${bmi}`;
  } else {
    return `Obese (Over weight): ${bmi}`;
  }
};

export default calculateBmi;