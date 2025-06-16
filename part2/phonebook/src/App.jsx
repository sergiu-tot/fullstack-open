import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import numberHandling from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // load initial list of persons
  useEffect(() => {
      numberHandling
        .getAll()
        .then(response => setPersons(response))
      }, [])

  // handle form submit, with parameters so that I can access the states
  const handleSubmit = event => numberHandling.addNewPerson(event, persons, setPersons,
                                                            newName, setNewName,
                                                            newNumber, setNewNumber,
                                                            errorMessage, setErrorMessage,
                                                            successMessage, setSuccessMessage)

  // delete a number by id
  const deleteNumber = person => {
      if (window.confirm(`Delete ${person.name}`)) {
          numberHandling.deleteNumber(person.id)
              .then(() => {
                setSuccessMessage(`'${person.name}' was removed from server`)
                setTimeout(() => { setSuccessMessage(null) }, 5000)
              })
              .catch(error => {
                  setErrorMessage(`Could not delete '${person.name}'`)
                  setTimeout(() => { setErrorMessage(null) }, 5000)
              })
          setPersons(persons.filter(p => p.id !== person.id))
      }
  }

  // filter the names to be shown
  const namesToShow = persons.filter( person => person.name.toUpperCase().includes(newFilter.toUpperCase() ) )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
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