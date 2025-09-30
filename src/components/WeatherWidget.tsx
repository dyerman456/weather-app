import {WeatherWidgetDataType} from "./City";
import {TemperatureNow} from "./TemperatureNow";
import {WeatherTitle} from "./WeatherTitle";
import {WeatherForecast} from "./WeatherForecast";

import clearDayIcon from "../img/icons/clear-day.svg";
import cloudyIcon from "../img/icons/cloudy.svg";
import partlyCloudyIcon from "../img/icons/partly-cloudy.svg";
import rainyIcon from "../img/icons/rainy.svg";

type WeatherWidgetType = {
  name: string
  weatherWidgetData: WeatherWidgetDataType
}

export const WeatherWidget = (props: WeatherWidgetType) => {

  let weatherConditions = {
    clearDayIcon,
    cloudyIcon,
    partlyCloudyIcon,
    rainyIcon
  }

  const {name, weatherWidgetData} = props

  return (
    <div className="city">
      <h1>{name}</h1>
      <TemperatureNow temperature={weatherWidgetData.temperature}/>
      <WeatherTitle weatherTitle={weatherWidgetData.weatherTitle} weatherConditions={weatherConditions}/>
      <WeatherForecast weatherWidgetData={weatherWidgetData} weatherConditions={weatherConditions}/>
    </div>
  )
}