import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('');
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);
  const [weather, setWeather] = useState();

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().indexOf(search.toLowerCase()) >= 0)
  const selectedContryToShowIndex = countriesToShow.length === 1 ? 0 : selectedCountryIndex
  const countryToShowDetails = selectedContryToShowIndex === -1 ? null : countriesToShow[selectedContryToShowIndex]

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
      <CountryList countriesToShow={countriesToShow.length === 1 ? [] : countriesToShow} setSelectedCountry={(index) => setSelectedCountryIndex(index)} />
      <CountryDetails country={countryToShowDetails} weather={weather} />
    </>
  )
}

export default App;
