import axios from "axios";
import { useState, useEffect } from "react";

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({ search, onSearchChanged }) =>
  <>find countries <input value={search} onChange={onSearchChanged} /></>

const Weather = ({ weather }) => {
  if (weather) {
    return (
      <div>
        <h2>Weather</h2>
        <div>temperature {weather.temperature} Celcius</div>
        <img alt={weather.description} src={weather.icon} />
        <div>wind {weather.windSpeed} m/s</div>
      </div>
    )
  }
  return <></>
}
const CountryDetails = ({ country, weather }) => {
  if (country)
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital.join(' ,')}</div>
        <div>area {country.area}</div>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((v) => <li key={v}>{v}</li>)}
        </ul>
        <img alt={country.name.common} src={country.flags.png} />
        <Weather weather={weather} />
      </div>
    )

  return <></>
}

const SearchResult = ({ countriesToShow, setSelectedCountry }) => {

  const onShowHandler = (event) => {
    event.preventDefault()
    setSelectedCountry(event.target.value)
  }

  if (countriesToShow.length >= 10)
    return <div>Too many matches, specify another filter</div>

  if (countriesToShow.length === 1) {
    return <></>
  }

  return (
    <>
      {countriesToShow.map((c, i) => <div key={c.name.common}>{c.name.common} <button value={i} onClick={onShowHandler}>show</button></div>)}
    </>
  );
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('');
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);
  const [weather, setWeather] = useState();

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().indexOf(search.toLowerCase()) >= 0)
  const selectedContryToShowIndex = countriesToShow.length === 1 ? 0 : selectedCountryIndex
  const countryToShowDetails = countriesToShow[selectedContryToShowIndex]

  const onSearchChanged = (event) => {    
    setSelectedCountryIndex(-1)
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => setCountries(response.data))
  }, [])

  useEffect(() => {
    if (countryToShowDetails)
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${countryToShowDetails.capitalInfo.latlng[0]}&lon=${countryToShowDetails.capitalInfo.latlng[1]}&appid=${api_key}&units=metric&cnt=1`).then(response => {
        const weatherinfo = {
          temperature: response.data.list[0].main.temp,
          icon: `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`,
          description: response.data.list[0].weather[0].description,
          windSpeed: response.data.list[0].wind.speed
        }
        setWeather(weatherinfo)
      })
  }, [countryToShowDetails])

  return (
    <>
      <Filter search={search} onSearchChanged={onSearchChanged} />
      <SearchResult countriesToShow={countriesToShow} setSelectedCountry={(i) => setSelectedCountryIndex(i)} />
      <CountryDetails country={countryToShowDetails} weather={weather} />
    </>
  )
}

export default App;
