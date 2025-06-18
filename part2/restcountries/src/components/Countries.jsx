import CountryDetails from '../components/CountryDetails'
import CountryItem from '../components/CountryItem'

const Countries = ({list, filter, setFilter}) => {
    if (list) {
        const toShow = list.filter( country => country.name.common.toUpperCase().includes(filter.toUpperCase() ))

        if (toShow.length >= 10) {
            return <div>Too many matches, specify another filter</div>
        } else if (toShow.length == 1) {
            const country = toShow[0]
            return <CountryDetails country={country} />
        } else {
            return <div>{toShow.map(country => <CountryItem key={country.name.common} country={country} setFilter={setFilter} />)}</div>
        }
    }
}

export default Countries