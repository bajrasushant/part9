import { calculateExercises } from "./calculateExercises";

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

  return {
    days: args.slice(2, args.length - 1).map((arg) => Number(arg)),
    goal: goalLast,
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
