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

export default Weather