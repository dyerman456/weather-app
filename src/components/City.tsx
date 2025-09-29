import {Temperature} from "./Temperature";
import {useEffect, useState} from "react";
import axios from "axios";
import {WeatherTitle} from "./WeatherTitle";
import {v1} from "uuid";

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
  days: Array<{
    hours: Array<{
      datetime: string,
      temp: number
    }>
  }>
}

type WeatherForecastType = {
  index: string
  time: string
  temperature: number
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

    const currentHour = new Date().getHours()
    const controller = new AbortController()

    axios.get<DataResponseType>(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${process.env.REACT_APP_API_KEY}&unitGroup=metric`, {signal: controller.signal})
      .then(res => {
        console.log(res)

        // setTemperature(Math.floor(res.data.currentConditions.temp))
        // setWeatherTitle(res.data.currentConditions.conditions)

        res.data.days[0].hours.forEach(el => {
          if (Number(el.datetime.slice(0, 2)) >= currentHour) {
            setWeatherForecast(prev => [...prev, {index: v1(), time: el.datetime.slice(0, 2), temperature: Math.floor(el.temp)}])
          }
        })

        setTemperature(Math.floor(res.data.days[0].hours[currentHour].temp))
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
                <p>{el.temperature}°C</p>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}