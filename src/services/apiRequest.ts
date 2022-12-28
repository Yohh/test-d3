import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_KEY;

const getData = (setState: Function) => {
  axios
    .get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=48.45&lon=1.49&exclude=current,minutely,hourly,alerts&units=metric&lang=fr&appid=${BASE_URL}`
    )
    .then((result) => {
      console.log("request: ", result);
      setState(result.data);
    })
    .catch((res) => console.log(res));
};

export { getData };
