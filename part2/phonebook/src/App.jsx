import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
      console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
            })
      }, [])

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