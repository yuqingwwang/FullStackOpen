const App = () => {

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartBaseWithDescription {
    kind: "basic"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBackground extends CoursePartBaseWithDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartBaseWithDescription {
    requirements: string[];
    kind: "special"
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  const Part = (props: {part: CoursePart}): JSX.Element => {
    switch (props.part.kind) {
      case "basic":
        return (
          <div>
            <h3>{props.part.name} {props.part.exerciseCount}</h3>
            <p>{props.part.description}</p>
          </div>
        )
      case "group":
        return (
          <div>
            <h3>{props.part.name} {props.part.exerciseCount}</h3>
            <p>project exercises {props.part.groupProjectCount}</p>
          </div>
        )
      case "background":
        return (
          <div>
            <h3>{props.part.name} {props.part.exerciseCount}</h3>
            <p>{props.part.description}</p>
            <p>background material {props.part.backgroundMaterial}</p>
          </div>
        )
      case "special":
        return (
          <div>
            <h3>{props.part.name} {props.part.exerciseCount}</h3>
            <p>{props.part.description}</p>
            <p>required skills {props.part.requirements.join(", ")}</p>
          </div>
        )
      default:
        return assertNever(props.part);
    }
  }



  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  const Header = (props: {name: string}): JSX.Element => {
    return <h1>{props.name}</h1>;
  }

  const Content = (props: {courseParts: CoursePart[]}): JSX.Element => {
    return (
      <div>
        {props.courseParts.map(part => <Part part={part} />)}
      </div>
    )
  }

  const Total = (props: { total: number }): JSX.Element => {
    return (
      <p>Number of exercises  {props.total}</p>
    )
  }

  return (
    <div>
      <Header name="Half Stack application development" />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
