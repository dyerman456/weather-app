import {Temperature} from "./Temperature";
import {useEffect, useState} from "react";
import axios from "axios";
import {WeatherTitle} from "./WeatherTitle";
import {v1} from "uuid";

import clearDayIcon from '../img/icons/clear-day.svg'
import cloudyIcon from '../img/icons/cloudy.svg'
import partlyCloudyIcon from '../img/icons/partly-cloudy.svg'
import rainyIcon from '../img/icons/rainy.svg'
import sunriseIcon from  '../img/icons/sunrise.svg'

type CityType = {
  name: string
  coordinates: Array<number>,
}

type DataResponseType = {
  currentConditions: {
    conditions: string,
    temp: number,
    datetime: string
  },
  timezone: string,
  days: Array<{
    hours: Array<{
      datetime: string,
      conditions: string,
      temp: number
    }>
    sunrise: string
  }>
}

export type WeatherForecastType = {
  index: string
  time: string
  weatherTitle: string
  temperature: number
  isSunriseTime: boolean
}

export const City = (props: CityType) => {

  const {name, coordinates} = props
  const [latitude, longitude] = coordinates

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [temperature, setTemperature] = useState(1)
  const [weatherTitle, setWeatherTitle] = useState('')
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecastType[]>([])

  useEffect(() => {

    const controller = new AbortController()

    axios.get<DataResponseType>(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${process.env.REACT_APP_API_KEY}&unitGroup=metric`, {signal: controller.signal})
      .then(res => {
        console.log(res)

        const dateNow = new Date()
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: res.data.timezone,
          hour: "2-digit",
          hour12: false
        })
        const hourNow = formatter.format(dateNow)

        console.log(hourNow)

        let localForecast: WeatherForecastType[] = []

        res.data.days[0].hours.forEach(el => {
          if (el.datetime.slice(0, 2) >= hourNow) {
            localForecast.push({index: v1(), time: el.datetime.slice(0, 2), weatherTitle: el.conditions, temperature: Math.floor(el.temp), isSunriseTime: false})
          }
          if (el.datetime.slice(0, 2) === res.data.days[0].sunrise.slice(0, 2)) {
            localForecast.push({index: v1(), time: res.data.days[0].sunrise.slice(0, 5), weatherTitle: el.conditions, temperature: Math.floor(el.temp), isSunriseTime: true})
          }
        })

        res.data.days[1].hours.forEach((el) => {
          if (localForecast.length < 24) {
            localForecast.push({index: v1(), time: el.datetime.slice(0, 2), weatherTitle: el.conditions, temperature: Math.floor(el.temp), isSunriseTime: false})
          }
        })

        setWeatherForecast(localForecast)

        setTemperature(Math.floor(res.data.days[0].hours[Number(hourNow)].temp))
        setWeatherTitle(res.data.currentConditions.conditions)

      })
      .catch(err => {
        setError(err)
      })
      .finally(() => setLoading(false))


    return () => controller.abort()
  }, []);

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  if (error) {
    return (
      <p>{error}</p>
    )
  }

  return (
    <div className="city">
      <h1>{name}</h1>
      <Temperature temperature={temperature}/>
      <WeatherTitle weatherTitle={weatherTitle}/>
      <div>
        <div className="weather-forecast">
          {weatherForecast.map(el => {
            return (
              <span key={el.index}>
                <>{el.time} </>
                <p>
                  <img src={el.isSunriseTime ? sunriseIcon
                    : el.weatherTitle === 'Clear' ? clearDayIcon
                    : el.weatherTitle === 'Overcast' ? cloudyIcon
                      : el.weatherTitle === 'Partially cloudy' ? partlyCloudyIcon
                        : el.weatherTitle === 'Rain' ? rainyIcon
                          : '???'
                  } alt='icon'/>
                </p>
                <p>{el.temperature}°C</p>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}