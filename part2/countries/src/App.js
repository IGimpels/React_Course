import axios from "axios";
import { useState, useEffect } from "react";

const Filter = ({search, onSearchChanged}) => 
  <>find countries <input value={search} onChange={onSearchChanged}/></>


const SearchResult = ({countriesToShow}) => {
  if(countriesToShow.length >= 10)
    return <div>Too many matches, specify another filter</div>
    

  if(countriesToShow.length === 1) 
    return (
      <div>
          <h2>{countriesToShow[0].name.common}</h2>
          <div>capital {countriesToShow[0].capital.join(' ,')}</div>
          <div>area {countriesToShow[0].area}</div>
          <h3>languages</h3>
          <ul>
            {Object.values(countriesToShow[0].languages).map((v) => <li key={v}>{v}</li>)}
          </ul>
          <img alt={countriesToShow[0].name.common} src={countriesToShow[0].flags.png}/>
      </div>
    )

  return (  
      <>
        {countriesToShow.map(c => <div key={c.name.common}>{c.name.common}</div>)}
      </>
  );
 }
const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('');
  let countriesToShow = countries.filter(c => c.name.common.toLowerCase().indexOf(search.toLowerCase()) >= 0)

  const onSearchChanged = (event) => {    
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => setCountries(response.data))
  },[])

  return (
    <>
    <Filter search={search} onSearchChanged={onSearchChanged}/>
    <SearchResult countriesToShow={countriesToShow}/>
    </>
  )  
}

export default App;
