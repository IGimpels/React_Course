import axios from "axios";
import { useState, useEffect } from "react";

const Filter = ({search, onSearchChanged}) => 
  <>find countries <input value={search} onChange={onSearchChanged}/></>

const CountryDetails = ({country}) => {
  if(country)
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital.join(' ,')}</div>
        <div>area {country.area}</div>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((v) => <li key={v}>{v}</li>)}
        </ul>
        <img alt={country.name.common} src={country.flags.png}/>
      </div>
    )
  
  return <></>
}

const SearchResult = ({countriesToShow, setSelectedCountry}) => {
  
  const onShowHandler = (event) => {
    setSelectedCountry(event.target.value)
  }
  
  if(countriesToShow.length >= 10)
    return <div>Too many matches, specify another filter</div>      

  if(countriesToShow.length === 1) 
  {
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
  const [selectedCountry, setSelectedCountry] = useState(-1);
  
  let countriesToShow = countries.filter(c => c.name.common.toLowerCase().indexOf(search.toLowerCase()) >= 0)
  const showContryDetails = countriesToShow.length === 1 ? 0 : selectedCountry

  const onSearchChanged = (event) => {        
    setSelectedCountry(-1)
    setSearch(event.target.value)    
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => setCountries(response.data))
  },[])

  return (
    <>
    <Filter search={search} onSearchChanged={onSearchChanged}/>
    <SearchResult countriesToShow={countriesToShow} setSelectedCountry={(i) => setSelectedCountry(i)}/>    
    <CountryDetails country={countriesToShow[showContryDetails]}/>      
    </>
  )  
}

export default App;
