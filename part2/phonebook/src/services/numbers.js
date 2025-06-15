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

const addNewPerson = async (event, persons, setPersons, newName, setNewName, newNumber, setNewNumber) => {
    event.preventDefault()

    const findPerson = persons.find( person => person.name === newName )

    if (findPerson) {
        findPerson.number = newNumber
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            updateNumber(findPerson).then(r => {
              console.log('ok')
              setPersons(persons.map(p => p === findPerson ? findPerson : p))
              setNewName('')
              setNewNumber('')
            })
        }
    } else {
        const addName = { name: newName, number: newNumber }
        addNumber(addName).then(r => {
            setPersons(persons.concat(r))
            setNewName('')
            setNewNumber('')
        })
    }

}

export default { getAll, addNewPerson, deleteNumber }