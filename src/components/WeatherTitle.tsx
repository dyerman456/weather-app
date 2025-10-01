type WeatherTitleType = {
  weatherTitleText: string
  minTemperature: null | number
  maxTemperature: null | number
  weatherConditions: Record<string, string>
};

export const WeatherTitle = (props: WeatherTitleType) => {
  const { weatherTitleText, minTemperature, maxTemperature, weatherConditions } = props;

  let weatherTitleIcon;
  let mainWeatherCondition = weatherTitleText.split(',')[0];

  if (mainWeatherCondition === 'Clear') {
    weatherTitleIcon = weatherConditions.clearDayIcon;
  } else if (mainWeatherCondition === 'Overcast') {
    weatherTitleIcon = weatherConditions.cloudyIcon;
  } else if (mainWeatherCondition === 'Partially cloudy') {
    weatherTitleIcon = weatherConditions.partlyCloudyIcon;
  } else if (mainWeatherCondition === 'Rain') {
    weatherTitleIcon = weatherConditions.rainyIcon;
  }

  return (
    <div className="weather-title">
      <img src={weatherTitleIcon} alt="icon" />
      <p className="weather-title-condition">{weatherTitleText}</p>
      <div className="weather-title-temperature">
        <div className='weather-title-temperature-block'>
          <img src={weatherConditions.arrowDownIcon} alt='Minimal temperature'/>
          <p>{minTemperature}°</p>
        </div>
        <div className='weather-title-temperature-block'>
          <img src={weatherConditions.arrowUpIcon} alt='Maximal temperature'/>
          <p>{maxTemperature}°</p>
        </div>
      </div>
    </div>
  );
};
