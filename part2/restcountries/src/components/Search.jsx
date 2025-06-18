const Search = ({value, onChange}) => {
    return (
        <div>
            find countries <input value={value} onChange={(event) => {onChange(event.target.value)}} />
        </div>
        )
}

export default Search