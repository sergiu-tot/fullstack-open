const CountryItem = ({country, setFilter}) => {
    return <div>{country.name.common}<button onClick={() => setFilter(country.name.common)}>Show</button></div>
}

export default CountryItem