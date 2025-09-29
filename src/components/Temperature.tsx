type TemperatureType = {
  temperature: number
}

export const Temperature = (props: TemperatureType) => {

  const {temperature} = props

  return (
    <p>{`${temperature}°`}</p>
  )
}