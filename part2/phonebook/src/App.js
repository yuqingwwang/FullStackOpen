import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

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
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newPerson}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsAfterFilter}/>
    </div>
  )
  }

export default App
