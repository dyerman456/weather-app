type WeatherTitle = {
  weatherTitle: string
  weatherConditions: Record<string, string>
}

export const WeatherTitle = (props: WeatherTitle) => {
  const {weatherTitle, weatherConditions} = props

  let weatherTitleIcon
  let mainWeatherCondition = weatherTitle.split(",")[0]

  if (mainWeatherCondition === 'Clear') {
    weatherTitleIcon = weatherConditions.clearDayIcon
  } else if (mainWeatherCondition === 'Overcast') {
    weatherTitleIcon = weatherConditions.cloudyIcon
  } else if (mainWeatherCondition === 'Partially cloudy') {
    weatherTitleIcon = weatherConditions.partlyCloudyIcon
  } else if (mainWeatherCondition === 'Rain') {
    weatherTitleIcon = weatherConditions.rainyIcon
  }

  return (
    <span>
      <img src={weatherTitleIcon} alt='icon'/>
      <p>{weatherTitle}</p>
    </span>
  )
}