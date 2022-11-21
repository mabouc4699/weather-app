import { useEffect } from "react";
import { useStore } from "Context/useAppStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../Header";
import { Alert } from "../Alert";
import { Current } from "../Current";
import { HourlyChart } from "../HourlyChart";
import { Weekly } from "../Weekly";
import { Footer } from "../Footer";
import { HourlyList } from "../HourlyList";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import { setLatAndLong, userWeatherDataAvailable } from "Utils/dataFunctions";

const { REACT_APP_API_KEY } = process.env;

const AppContainer = () => {
  const { lat, long, setLat, setLong, units, weather, setWeather, weatherArray } = useStore();

  const fetchWeatherData = async (run: Boolean, latitude: number, longitude: number) => {
    if (run) {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${REACT_APP_API_KEY}&units=${units}`
      );

      console.log("Weather fetched. Set in localStorage");
      setWeather(Object.assign({}, res.data, { name: "Home" }));
      localStorage.setItem("weather", JSON.stringify(Object.assign({}, res.data, { name: "Home" })));
      return Object.assign({}, res.data, { name: "Home" });
    }

    console.log("Weather previously fetched. Found in localStorage");
    setWeather(JSON.parse(localStorage.getItem("weather") || "{}"));
  };

  useEffect(() => {
    if (localStorage.getItem("location") === null) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          localStorage.setItem("location", JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
          fetchWeatherData(true, position.coords.latitude, position.coords.longitude);
        },
        function (error) {
          console.log(error);
        },
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: true,
        }
      );
    } else if (localStorage.getItem("weather") !== null) {
      let userLocation = JSON.parse(localStorage.getItem("location") || "{}");
      setLat(userLocation.latitude);
      setLong(userLocation.longitude);
      fetchWeatherData(false, userLocation.latitude, userLocation.longitude);
    } else {
      let userLocation = JSON.parse(localStorage.getItem("location") || "{}");
      setLat(userLocation.latitude);
      setLong(userLocation.longitude);
      fetchWeatherData(true, userLocation.latitude, userLocation.longitude);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <CssBaseline />
        <Header />
        {/* To Do: Alerts needs to be conditionally rendered. Path from weather object => weather.data.alerts */}
        {/* <Alert /> */}
        <Routes>
          <Route path="/" element={<Current />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route
            path="/hourly"
            element={
              <>
                <HourlyChart />
                <HourlyList />
              </>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default AppContainer;
