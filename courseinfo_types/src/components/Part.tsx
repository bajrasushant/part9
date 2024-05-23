import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = (props: PartProps) => {
  let extra: JSX.Element;
  const part = props.part;
  switch (part.kind) {
    case "basic":
      extra = <p>{part.description}</p>;
      break;
    case "group":
      extra = <p>project exercises {part.groupProjectCount}</p>;
      break;
    case "background":
      extra = (
        <div>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
      break;
    case "special":
      extra = (
        <div>
          <p>{part.description}</p>
          <p>required skills {part.requirements.join(", ")} </p>
        </div>
      );
      break;
    default:
      return assertNever(part);
  }

  return (
    <div>
      <div>
        <b>
          {props.part.name} {props.part.exerciseCount}
        </b>
      </div>
      {extra}
    </div>
  );
};

export default Part;
