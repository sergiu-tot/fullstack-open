import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNumber = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const deleteNumber = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = person => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(response => response.data)
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