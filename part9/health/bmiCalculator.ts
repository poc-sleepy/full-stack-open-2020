const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight / height / height) * 10000;
  if (bmi < 18.5) {
    return 'Thinness (Under weight)';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else {
    return 'Obese (Over weight)';
  }
};

console.log(calculateBmi(180, 74));
