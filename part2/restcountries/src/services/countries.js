import axios from 'axios'

const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const owmBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const owmGeocodingBaseUrl = 'http://api.openweathermap.org/geo/1.0/direct'

const owmApiKey = import.meta.env.VITE_OWM_KEY

const getWeatherData = async (country) => {
    const coordinates = await getCapitalCoordinates(country.capital[0])
    const req = axios.get(`${owmBaseUrl}?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=${owmApiKey}&units=metric`)
    return req.then(resp => resp.data)
}

const getCapitalCoordinates = async capital => {
    const apiUrl = `${owmGeocodingBaseUrl}?q=${capital}&limit=1&appid=${owmApiKey}`
    const req = axios.get(apiUrl)
    return req
            .then(resp => resp.data[0])
            .catch(error => {
                console.error('Error fetching capital coordinates:', error)
                return {lat: null, lon: null}
            })
}

const getAll = () => {
    const req = axios.get(apiUrl)
    return req.then(resp => resp.data)
}

export default {getAll, getWeatherData}