import clearDayIcon from '../img/icons/clear-day.svg'
import cloudyIcon from '../img/icons/cloudy.svg'
import partlyCloudyIcon from '../img/icons/partly-cloudy.svg'
import rainyIcon from '../img/icons/rainy.svg'

type WeatherTitle = {
  weatherTitle: string
}

export const WeatherTitle = (props: WeatherTitle) => {
  const {weatherTitle} = props
  let weatherTitleIcon

  if (weatherTitle === 'Clear') {
    weatherTitleIcon = clearDayIcon
  }
  if (weatherTitle === 'Overcast') {
    weatherTitleIcon = cloudyIcon
  }
  if (weatherTitle === 'Partially cloudy') {
    weatherTitleIcon = partlyCloudyIcon
  }
  if (weatherTitle === 'Rain') {
    weatherTitleIcon = rainyIcon
  }

  return (
    <span>
      <img src={weatherTitleIcon} alt='icon'/>
      <p>{weatherTitle}</p>
    </span>
  )
}