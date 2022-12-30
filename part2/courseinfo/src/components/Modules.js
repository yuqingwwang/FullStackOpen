// Header
const Header = ({ name }) => {
  return (<>
    <h1>
      {name}
    </h1>
  </>)
}

// Content
const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

/* The application works regardless of
the number of parts a course has */

const Content = ({ parts }) =>
  parts.map((part, i) => (
    <Part key={i}
          part={part.name}
          exercises={part.exercises} />
  ));

// Total
const Total = ({ exercises }) => (
  <p>
    <strong>Total of {exercises} exercises</strong>
  </p>
);

export {Header};
export {Content};
export {Total};
