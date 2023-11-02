const App = () => {

  interface CoursePart {
    name: string;
    exerciseCount: number;
  }

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  const Header = (props: {name: string}): JSX.Element => {
    return <h1>{props.name}</h1>;
  }

  const Content = (props: { courseParts: CoursePart[] }): JSX.Element => {
    return (
      <div>
        {props.courseParts.map(part => <p>{part.name} {part.exerciseCount}</p>)}
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
