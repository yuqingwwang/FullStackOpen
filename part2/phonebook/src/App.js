import { useState } from 'react'

const Persons = ({ name }) => {
  return (
    <li>{name.name}</li>
  )
}

const App = ( props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newPerson, setNewPerson] = useState('')
  // const [showAll, setShowAll] = useState(true)


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newPerson
    }

    setPersons(persons.concat(noteObject))
    setNewPerson('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  // const personsToShow = showAll
  //   ? persons
  //   : persons.filter(note => note.important === true)

  return(
    <div>
      <h2>Phonebook</h2>
      {/* <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> */}
      {/* <ul>
        {personsToShow.map(person =>
          <Persons key={person.id} note={person} />
        )}
      </ul> */}
      <form onSubmit={addNote}>
        <input
            value={newPerson}
            onChange={handleNameChange}
          />
        <button type="submit">save</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Persons name={person} />
        )}
      </ul>
    </div>
  )
}

export default App
