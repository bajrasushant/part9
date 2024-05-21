import express from "express";
import { calculateBmi } from "./calculateBmi";
import { calculateExercises } from "./calculateExercises";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (
    !height ||
    !weight ||
    height <= 0 ||
    weight <= 0 ||
    isNaN(height) ||
    isNaN(weight)
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(height, weight);

  return res.status(200).json({
    weight,
    height,
    bmi: bmi,
  });
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if(
    !target ||
    !daily_exercises
  ){
    return res.status(400).json({
      error: "missing parameters",
    });
  }
  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises)
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out = calculateExercises(daily_exercises as number[], Number(target));

  return res.status(200).json(out);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
