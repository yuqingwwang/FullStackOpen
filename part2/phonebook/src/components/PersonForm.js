import React from 'react';

const PersonForm = ({ addPerson, newPerson, handleNameChange, newNumber, handleNumberChange }) => (
  <div>
    <form onSubmit={addPerson}>
    <div>Name: <input
            value={newPerson}
            onChange={handleNameChange}
          /></div>
    <div>Number: <input
          value={newNumber}
          onChange={handleNumberChange}
        /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

export default PersonForm;
