import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/phonebook'



const App = ( props ) => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response)
    }

    personService
      .getAll()
      .then(eventHandler)
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber
    }
    const checkPerson = persons.find(person =>
      person.name.toLowerCase() === personObject.name.toLowerCase())

    const alreadyExists = persons.some((person) => person.name.toLowerCase() === newPerson.toLowerCase());

    if(alreadyExists) {
      alert(newPerson + ' is already added to phonebook')
      if(checkPerson.number !== newNumber){
        const confirmNewNumber = window.confirm(`Are you sure you want replace ${checkPerson.name}'s number with a new one?`)
        //update the same person with new phone number
        if(confirmNewNumber){
          const personId = persons.find(n => n.name === newPerson).id

          personService
          .update(personId, personObject)
          .then(returnedNote => {
            setPersons(persons.map(person => person.id !== personId ? person : returnedNote))
          })
        }
        }
    }
    else{
      personService
          .create(personObject)
          .then(returnedNote => {
            setPersons(persons.concat(personObject))});
    };
    setNewPerson('')
    setNewNumber('')
  }

  const personsAfterFilter = filter === ''? persons : persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${person.name}?`)

    if (confirmDelete) {
      personService
        .remove(id)
        .then(returnedNote => {
          persons.map(person => person.id !== id ? person : returnedNote)
        })
      setPersons(persons.filter(person => person.id !== id))}
    }

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
        newPerson={newPerson}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsAfterFilter}
        deletePerson={deletePerson}/>
    </div>
  )
}


export default App
