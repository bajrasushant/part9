type Rating = 1 | 2 | 3;

interface Output {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHrs: number[],
  goal: number,
): Output => {
  const periodLength = dailyExerciseHrs.length;
  const trainingDays = dailyExerciseHrs.reduce(
    (count, hrs) => (hrs !== 0 ? count + 1 : count),
    0,
  );
  const totalHrs = dailyExerciseHrs.reduce(
    (totalHrs, hrs) => totalHrs + hrs,
    0,
  );
  const average = periodLength === 0 ? 0 : totalHrs / periodLength;

  const success = average >= goal ? true : false;

  const diffGoal = average - goal;
  let rating: Rating;
  let ratingDescription: string;
  if (diffGoal > 0.5) {
    rating = 3;
    ratingDescription = "Wohoooo Great job keep going!";
  } else if (diffGoal >= -0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "time to gear up soldier";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: goal,
    average,
  };
};
