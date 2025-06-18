import {useState, useEffect} from 'react'
import rc from '../services/countries.js'

const CountryDetails = ({country}) => {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        rc.getWeatherData(country).then(data => setWeatherData(data))
    })

    return(
                <div>
                    <h1>{country.name.common}</h1>
                    <div>Capital {country.capital}</div>
                    <div>Area {country.area}</div>
                    <h1>Languages</h1>
                    <ul>
                        {Object.values(country.languages).map(value => <li key={value}>{value}</li>)}
                    </ul>
                    <img src={country.flags.png} />
                    <h1>Weather in {country.capital}</h1>
                    {weatherData ? (
                        <>
                        <p>Temperature: {weatherData.main.temp} Celsius</p>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                        <p>Wind: {weatherData.wind.speed} m/s</p>
                        </>
                    ) : (<p>Loading weather data...</p>)}

                </div>
    )
}

export default CountryDetails