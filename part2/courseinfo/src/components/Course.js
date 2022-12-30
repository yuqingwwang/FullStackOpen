import {Header, Content, Total} from './Modules'

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

export default Courses;
