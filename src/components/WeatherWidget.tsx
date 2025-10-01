import { WeatherWidgetDataType } from './City';
import { TemperatureNow } from './TemperatureNow';
import { WeatherTitle } from './WeatherTitle';
import { WeatherForecast } from './WeatherForecast';

import clearDayIcon from '../img/icons/clear-day.svg';
import cloudyIcon from '../img/icons/cloudy.svg';
import partlyCloudyIcon from '../img/icons/partly-cloudy.svg';
import rainyIcon from '../img/icons/rainy.svg';
import arrowDownIcon from '../img/icons/arrow-down.svg'
import arrowUpIcon from '../img/icons/arrow-up.svg'

type WeatherWidgetType = {
  name: string;
  weatherWidgetData: WeatherWidgetDataType;
};

export const WeatherWidget = (props: WeatherWidgetType) => {
  let weatherConditions = {
    clearDayIcon,
    cloudyIcon,
    partlyCloudyIcon,
    rainyIcon,
    arrowDownIcon,
    arrowUpIcon
  };

  const { name, weatherWidgetData } = props;

  return (
    <div className='city'>
      <div className='city-header'>
        <div>
          <h1>{name}</h1>
          <TemperatureNow temperature={weatherWidgetData.temperature} />
        </div>
        <WeatherTitle
          weatherTitleText={weatherWidgetData.weatherTitleText}
          minTemperature={weatherWidgetData.minTemperature}
          maxTemperature={weatherWidgetData.maxTemperature}
          weatherConditions={weatherConditions}
        />
      </div>
      <WeatherForecast
        weatherWidgetData={weatherWidgetData}
        weatherConditions={weatherConditions}
      />
    </div>
  );
};
