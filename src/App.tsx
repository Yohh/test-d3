import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { getData } from "./service/apiRequest";

interface Data {
  daily: [];
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

  console.log("data: ", data);

  return <div className="App">hello</div>;
}

export default App;
