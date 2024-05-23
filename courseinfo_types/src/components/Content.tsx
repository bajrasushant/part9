import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProp {
  parts: CoursePart[];
}

const Content = (props: ContentProp) => {
  const courseParts = props.parts;
  return courseParts.map((p) => <Part part={p} key={p.name} />);
};

export default Content;
