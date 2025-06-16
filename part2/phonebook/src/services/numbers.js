import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(resp => resp.data)
}

const addNumber = person => {
    const req = axios.post(baseUrl, person)
    return req.then(resp => resp.data)
}

const deleteNumber = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(resp => resp.data)
}

const updateNumber = person => {
    const req = axios.put(`${baseUrl}/${person.id}`, person)
    return req.then(resp => resp.data)
}

const addNewPerson = async (event, persons, setPersons, newName, setNewName, newNumber, setNewNumber, errorMessage, setErrorMessage, successMessage, setSuccessMessage) => {
    event.preventDefault()

    const findPerson = persons.find( person => person.name === newName )

    if (findPerson) {
        findPerson.number = newNumber
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            updateNumber(findPerson)
            .then(r => {
              setPersons(persons.map(p => p === findPerson ? findPerson : p))
              setNewName('')
              setNewNumber('')
            })
            .then(() => {
                setSuccessMessage(`'${findPerson.name}' was updated`)
                setTimeout(() => { setSuccessMessage(null) }, 5000)
            })
            .catch(error => {
                setErrorMessage(`Could not update '${findPerson.name}'`)
                setTimeout(() => { setErrorMessage(null) }, 5000)
            })
        }
    } else {
        const addName = { name: newName, number: newNumber }
        addNumber(addName).then(r => {
            setPersons(persons.concat(r))
            setNewName('')
            setNewNumber('')
        })
        .then(() => {
            setSuccessMessage(`'${addName.name}' was added`)
            setTimeout(() => { setSuccessMessage(null) }, 5000)
        })
        .catch(error => {
            setErrorMessage(`Could not add '${addName.name}'`)
            setTimeout(() => { setErrorMessage(null) }, 5000)
        })
    }

}

export default { getAll, addNewPerson, deleteNumber }