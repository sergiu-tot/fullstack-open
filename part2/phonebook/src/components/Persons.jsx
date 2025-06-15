const Persons = ({names, deleteNumber}) => names.map(person => {
    return (
            <p key={person.id}>
                {person.name} {person.number}
                <button onClick={() => deleteNumber(person)}>delete</button>
            </p>
        )
})

export default Persons