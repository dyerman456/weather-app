import React from 'react';
import './App.css';
import { City } from './components/City';
import { v1 } from 'uuid';

type CityType = {
  id: string;
  name: string;
  N: number;
  E: number;
};

function App() {
  const cities: CityType[] = [
    { id: v1(), name: 'Warsaw', N: 52.2297, E: 21.0122 },
    { id: v1(), name: 'Gdansk', N: 54.352, E: 18.6466 },
    { id: v1(), name: 'Grodno', N: 53.6688, E: 23.8223 },
    { id: v1(), name: 'Sumy', N: 50.9077, E: 34.7981 },
    { id: v1(), name: 'New York', N: 40.7128, E: -74.006 },
  ];

  return (
    <div className='container'>
      <div className='App'>
        {cities.map((city) => {
          return (
            <City
              key={city.id}
              name={city.name}
              coordinates={[city.N, city.E]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
