interface ExerciseCalcValues {
  days: number[];
  goal: number;
}

const parseExerciseArguments = (args: string[]): ExerciseCalcValues => {
  if (args.length < 5) throw new Error("Not enough arguments");

  const goalLast = Number(args[args.length - 1]);

  const allNumbers = args.slice(2).every((arg) => !isNaN(Number(arg)));

  if (!allNumbers) {
    throw new Error("Some of the provided values were not numbers");
  }

  if (args.length > 5) {
    return {
      days: args.slice(2, args.length - 1).map((arg) => Number(arg)),
      goal: goalLast,
    };
  }
};

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

const calculateExercises = (
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

try {
  const { days, goal } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(days, goal));
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
