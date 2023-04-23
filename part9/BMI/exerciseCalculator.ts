interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter((h: number) => h > 0).length;
  const totalHours: number = hours.reduce((a: number, b: number) => a + b);
  const average: number = totalHours / periodLength;
  const success: boolean = average >= target;
  const ratio: number = average / target;
  let rating: number;
  let ratingDescription: string;
  if (ratio >= 1.5) {
    rating = 3;
    ratingDescription = 'excellent';
  } else if (ratio >= 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'poor';
  }
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

//slicing the args to get the third element and onwards
const hours = process.argv.slice(3).map((h) => Number(h));
const target = Number(process.argv[2]);

console.log(calculateExercises(hours, target));

export default calculateExercises
