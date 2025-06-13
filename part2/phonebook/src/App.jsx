import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const namesToShow = persons.filter( person => person.name.toUpperCase().includes(newFilter.toUpperCase() ) )

  const addNewPerson = (event) => {
      event.preventDefault()

      if (persons.find( (person) => person.name === newName )) {
          window.alert(`${newName} is already added to phonebook`)
      } else {
          const addName = { name: newName, number: newNumber, id: String(persons.length + 1) }
          setPersons(persons.concat(addName))
          setNewName('')
          setNewNumber('')
      }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new number</h2>
      <PersonForm onSubmit={addNewPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons names={namesToShow} />
    </div>
  )
}

export default App