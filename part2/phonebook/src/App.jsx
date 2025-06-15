import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import numberHandling from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
      console.log('effect')
      numberHandling
        .getAll()
        .then(response => setPersons(response))
      }, [])

  const handleSubmit = (event) => numberHandling.addNewPerson(event, persons, setPersons, newName, setNewName, newNumber, setNewNumber)

  const deleteNumber = (p) => {
      if (window.confirm(`Delete ${p.name}`)) {
          numberHandling.deleteNumber(p.id)
          setPersons(persons.filter(person => person.id !== p.id))
      }
  }

  const namesToShow = persons.filter( person => person.name.toUpperCase().includes(newFilter.toUpperCase() ) )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new number</h2>
      <PersonForm
            onSubmit={handleSubmit}
            newName={newName}
            setNewName={setNewName}
            newNumber={newNumber}
            setNewNumber={setNewNumber}
        />
      <h2>Numbers</h2>
      <Persons names={namesToShow} deleteNumber={deleteNumber} />
    </div>
  )
}

export default App