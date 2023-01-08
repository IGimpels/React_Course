const Country = ({country, onSelect}) => <div>{country.name.common} <button onClick={onSelect}>show</button></div>

const CountryList = ({ countriesToShow, setSelectedCountry }) => {
    const onShowHandler = (index) => {
      setSelectedCountry(index)
    }
  
    if (countriesToShow.length >= 10)
      return <div>Too many matches, specify another filter</div>
  
    return (
      <>
        {countriesToShow.map((c, i) => <Country key={c.name.common} country={c} onSelect={() => onShowHandler(i)}/>)}
      </>
    );
  }

  export default CountryList