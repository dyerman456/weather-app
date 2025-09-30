type TemperatureType = {
  temperature: number;
};

export const TemperatureNow = (props: TemperatureType) => {
  const { temperature } = props;

  return <h2 className='city-temperature'>{`${temperature}°`}</h2>;
};
