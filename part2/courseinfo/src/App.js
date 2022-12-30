const Header = ({ name }) => {
  return (<>
    <h1>
      {name}
    </h1>
  </>)
}

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

// The application works regardless of
// the number of parts a course has
const Content = ({ parts }) =>
  parts.map((part, i) => (
    <Part key={i}
          part={part.name}
          exercises={part.exercises} />
  ));

const Total = ({ exercises }) => (
  <p>
    Number of exercises {exercises}
  </p>
);

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const Courses = ({ courses }) =>
    courses.map(function (course, i) {
      // using array method reduce

      /*const sumWithInitial =
      array1.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue);*/

    const total = course.parts.reduce((total, part)=>
    total + part.exercises, 0);
    
    return(
      <div key={i}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total exercises={total} />
    </div>
    )
    }
  );

  return (
    <>
    {Courses({courses})}
    </>
  );
}

export default App
