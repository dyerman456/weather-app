type WeatherTitleType = {
  weatherTitleText: string;
  weatherConditions: Record<string, string>;
};

export const WeatherTitle = (props: WeatherTitleType) => {
  const { weatherTitleText, weatherConditions } = props;

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
    <div className='weather-title'>
      <img src={weatherTitleIcon} alt='icon' />
      <p className='weather-title-condition'>{weatherTitleText}</p>
    </div>
  );
};
