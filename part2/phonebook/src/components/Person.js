import React from 'react';

const Person = ({ person, deletePerson}) => (
  <li className='person'>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id)}>Delete</button>
  </li>
)

export default Person;
