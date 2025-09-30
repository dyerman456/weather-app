import sunriseIcon from "../img/icons/sunrise.svg";
import sunsetIcon from "../img/icons/sunset.svg"
import {WeatherWidgetDataType} from "./City";

type WeatherForecastType = {
  weatherWidgetData: WeatherWidgetDataType
  weatherConditions: Record<string, string>
}

export const WeatherForecast = (props: WeatherForecastType) => {

  const {weatherWidgetData, weatherConditions} = props

  return (
    <div className="weather-forecast">
      {weatherWidgetData.weatherForecast.map(el => {

        let weatherIcon
        let mainWeatherCondition = el.weatherTitle.split(",")[0]

        if (el.isSunriseTime) {
          weatherIcon = sunriseIcon
        } else if (el.isSunsetTime) {
          weatherIcon = sunsetIcon
        } else if (mainWeatherCondition === 'Clear') {
          weatherIcon = weatherConditions.clearDayIcon
        } else if (mainWeatherCondition === 'Overcast') {
          weatherIcon = weatherConditions.cloudyIcon
        } else if (mainWeatherCondition === 'Partially cloudy') {
          weatherIcon = weatherConditions.partlyCloudyIcon
        } else if (mainWeatherCondition === 'Rain') {
          weatherIcon = weatherConditions.rainyIcon
        }

        return (
          <span key={el.index}>
            <>{el.time} </>
            <p>
              <img src={weatherIcon} alt='icon'/>
            </p>
            <p>{el.temperature}°C</p>
          </span>
        )
      })}
    </div>
  )
}