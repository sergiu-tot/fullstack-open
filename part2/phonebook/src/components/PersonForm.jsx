const AddInput = ({text, value, setValue}) => <div>{text}: <input value={value} onChange={(event) => setValue(event.target.value)} /></div>

const AddButton = () => <button type="submit">add</button>

const PersonForm = ({onSubmit, newName, setNewName, newNumber, setNewNumber, persons}) => {
    return (
        <form onSubmit={onSubmit}>
            <AddInput text="name" value={newName} setValue={setNewName} />
            <AddInput text="number" value={newNumber} setValue={setNewNumber} />
            <AddButton />
        </form>
    )
}

export default PersonForm