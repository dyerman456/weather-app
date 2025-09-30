type TemperatureType = {
  temperature: number
}

export const TemperatureNow = (props: TemperatureType) => {

  const {temperature} = props

  return (
    <p>{`${temperature}°`}</p>
  )
}