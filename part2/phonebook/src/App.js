import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = ( props ) => {
  const [persons, setPersons] = useState([])

  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

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

  const personsAfterFilter = filter === ''? persons :
   persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
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
