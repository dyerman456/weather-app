import { useEffect, useState } from 'react';
import axios from 'axios';
import { v1 } from 'uuid';
import { WeatherWidget } from './WeatherWidget';

type CityType = {
  name: string;
  coordinates: Array<number>;
};

type DataResponseType = {
  currentConditions: {
    conditions: string;
    temp: number;
    datetime: string;
  };
  timezone: string;
  days: Array<{
    hours: Array<{
      datetime: string;
      conditions: string;
      temp: number;
    }>;
    sunrise: string;
    sunset: string;
    tempmax: number;
    tempmin: number
  }>;
};

export type WeatherForecastType = {
  index: string;
  time: string;
  weatherTitle: string;
  temperature: number;
  isSunriseTime: boolean;
  isSunsetTime: boolean;
};

export type WeatherWidgetDataType = {
  loading: boolean;
  error: boolean;
  temperature: number;
  minTemperature: null | number
  maxTemperature: null | number,
  weatherTitleText: string;
  weatherForecast: WeatherForecastType[];
};

export const City = (props: CityType) => {
  const { name, coordinates } = props;
  const [latitude, longitude] = coordinates;

  const [weatherWidgetData, setWeatherWidgetData] =
    useState<WeatherWidgetDataType>({
      loading: true,
      error: false,
      temperature: 0,
      minTemperature: null,
      maxTemperature: null,
      weatherTitleText: '',
      weatherForecast: []
    });

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<DataResponseType>(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${process.env.REACT_APP_API_KEY}&unitGroup=metric`,
        { signal: controller.signal }
      )
      .then((res) => {
        console.log(name);
        console.log(res);

        const dateNow = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: res.data.timezone,
          hour: '2-digit',
          hour12: false
        });
        const hourNow = formatter.format(dateNow);
        console.log(hourNow);

        let firstDay = res.data.days[0];
        let secondDay = res.data.days[1];
        let localForecast: WeatherForecastType[] = [];

        firstDay.hours.forEach((el) => {
          let currentHour = el.datetime.slice(0, 2);

          if (currentHour >= hourNow) {
            localForecast.push({
              index: v1(),
              time: currentHour,
              weatherTitle: el.conditions,
              temperature: Math.floor(el.temp),
              isSunriseTime: false,
              isSunsetTime: false
            });
          }

          if (
            currentHour === firstDay.sunrise.slice(0, 2) &&
            hourNow <= currentHour
          ) {
            localForecast.push({
              index: v1(),
              time: firstDay.sunrise.slice(0, 5),
              weatherTitle: el.conditions,
              temperature: Math.floor(el.temp),
              isSunriseTime: true,
              isSunsetTime: false
            });
          } else if (
            currentHour === firstDay.sunset.slice(0, 2) &&
            hourNow <= currentHour
          ) {
            localForecast.push({
              index: v1(),
              time: firstDay.sunset.slice(0, 5),
              weatherTitle: el.conditions,
              temperature: Math.floor(el.temp),
              isSunriseTime: false,
              isSunsetTime: true
            });
          }
        });

        secondDay.hours.forEach((el) => {
          let currentHour = el.datetime.slice(0, 2);

          if (localForecast.length < 26) {
            localForecast.push({
              index: v1(),
              time: el.datetime.slice(0, 2),
              weatherTitle: el.conditions,
              temperature: Math.floor(el.temp),
              isSunriseTime: false,
              isSunsetTime: false
            });
            if (currentHour === secondDay.sunrise.slice(0, 2)) {
              localForecast.push({
                index: v1(),
                time: el.datetime.slice(0, 2),
                weatherTitle: el.conditions,
                temperature: Math.floor(el.temp),
                isSunriseTime: true,
                isSunsetTime: false
              });
            } else if (currentHour === secondDay.sunset.slice(0, 2)) {
              localForecast.push({
                index: v1(),
                time: firstDay.sunset.slice(0, 5),
                weatherTitle: el.conditions,
                temperature: Math.floor(el.temp),
                isSunriseTime: false,
                isSunsetTime: true
              });
            }
          }
        });

        setWeatherWidgetData((prev) => ({
          ...prev,
          temperature: Math.floor(firstDay.hours[Number(hourNow)].temp),
          minTemperature: Math.floor(firstDay.tempmin),
          maxTemperature: Math.floor(firstDay.tempmax),
          weatherTitleText: res.data.currentConditions.conditions,
          weatherForecast: localForecast
        }));
      })
      .catch((err) => {
        setWeatherWidgetData((prev) => ({ ...prev, error: err }));
      })
      .finally(() =>
        setWeatherWidgetData((prev) => ({ ...prev, loading: false }))
      );

    return () => controller.abort();
  }, []);

  if (weatherWidgetData.loading) {
    return <p>Loading...</p>;
  }

  if (weatherWidgetData.error) {
    return <p>{weatherWidgetData.error}</p>;
  }

  return <WeatherWidget name={name} weatherWidgetData={weatherWidgetData} />;
};
