import { useState } from 'react'

const Person = ({ person}) => (
  <li>
    {person.name} {person.number}
    {/* <button onClick={() => deletePerson(person.id)}>Delete</button> */}
  </li>
)

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <ul>
        {persons
          .map(person =>
            <Person
              key={person.id}
              person={person}
            />
        )}
      </ul>
    </div>
  )
}

const Filter = ({ filter, handleFilter }) => (
  <div>
    <form>
      <div>
        filter shown with <input
          value={filter}
          onChange={handleFilter}
        />
      </div>
    </form>
  </div>
)

const App = ( props ) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter ] = useState('')

  const personsAfterFilter = filter === ''  ? persons : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newPerson,
      id: persons.length + 1,
      number: newNumber
    }

    const alreadyExists = persons.some((person) => person.name === newPerson);

    if(alreadyExists) {
      alert(newPerson + ' is already added to phonebook')}
    else {
      setPersons(persons.concat(noteObject))
      setNewPerson('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return(
    <div>
      <h1>Phonebook</h1>
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>Name: <input
            value={newPerson}
            onChange={handleNameChange}
          /></div>
        <div>Number: <input
            value={newNumber}
            onChange={handleNumberChange}
          /></div>
        <button type="submit">save</button>
      </form>
      <h2>Numbers</h2>
      <Persons
        persons={personsAfterFilter}/>

      {/* <ul>
        {persons.map(person =>
          <Persons key={person.id} name={person}/>
        )}
      </ul> */}
    </div>
  )
  }

export default App
