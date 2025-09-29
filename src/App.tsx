import React from 'react';
import './App.css';
import {City} from "./components/City";
import {v1} from "uuid";

type CityType = {
  id: string
  name: string,
  N: number,
  E: number,
}

function App() {

  const cities: CityType[] = [
    {id: v1(), name: 'Warsaw', N: 52.2297, E: 21.0122},
    {id: v1(), name: 'Gdansk', N: 54.3520, E: 18.6466},
  ]

  return (
    <div className="container">
      <div className="App">
        {cities.map(city => {
          return (
            <City key={city.id} name={city.name} coordinates={[city.N, city.E]}/>
          )
        })}
      </div>
    </div>
  );
}

export default App;
