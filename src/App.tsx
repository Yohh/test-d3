import { useEffect, useState } from "react";
import "./App.scss";
import { getData } from "./service/apiRequest";

interface Temp {
  min: number;
  max: number;
}

interface Day {
  temp: Temp;
}

interface Data {
  daily: Day[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

function App() {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    getData(setData);
  }, []);

  console.log("data: ", data?.daily);

  return (
    <div className="App">{`tomorrow min: ${data?.daily[1].temp.min}°C, max: ${data?.daily[0].temp.max}°C`}</div>
  );
}

export default App;
