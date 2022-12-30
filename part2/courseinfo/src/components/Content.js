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

export default Content;
