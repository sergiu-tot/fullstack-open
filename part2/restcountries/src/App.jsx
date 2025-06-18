import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import Search from './components/Search'
import Countries from './components/Countries'
import rc from './services/countries.js'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect( () => {
          rc.getAll()
            .then(response => setCountries(response))
      }, []
  )


  return (
    <>
        <Search value={filter} onChange={setFilter} />
        <Countries list={countries} filter={filter} setFilter={setFilter} />
    </>
  )
}

export default App
