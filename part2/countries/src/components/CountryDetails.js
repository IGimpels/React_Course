import Weather from "./Weather"
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

export default CountryDetails