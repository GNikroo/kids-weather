import React, { useState, useEffect } from "react";
import axios from "axios";
import { outfits, weatherConditions } from "../../data";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "../../styles/HistoricalWeather.module.css";
import appStyles from "../../App.module.css";
import image from "../../assets/clothing/Child.png";
import ScreenSizeChecker from "../ScreenSizeChecker";
import useWeatherStore from "../hooks/useWeatherStore";

const HistoricalWeather = () => {
  const { inputLocation, locationData, fetchLocationData } = useWeatherStore();
  const { isSmallScreen } = ScreenSizeChecker();
  const [historicalWeatherData, setHistoricalWeatherData] = useState(null);
  const [inputDate, setInputDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocationData();
  }, [inputLocation, fetchLocationData]);

  const handleInputDateChange = (e) => {
    const newDate = e.target.value;
    setInputDate(newDate);
  };

  useEffect(() => {
    const fetchHistoricalWeatherData = async () => {
      try {
        const accessKey = process.env.REACT_APP_WEATHER_API_KEY;
        const weatherResponse = await axios.get(
          `https://api.weatherstack.com/historical?access_key=${accessKey}&query=${inputLocation}&historical_date=${inputDate}&hourly=1&interval=1`
        );

        if (weatherResponse.data && weatherResponse.data.historical) {
          setHistoricalWeatherData(
            weatherResponse.data.historical[inputDate].hourly[6]
          );
        } else {
          console.error("Weather data not found");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistoricalWeatherData();
  }, [inputLocation, inputDate]);

  const getWeatherIcon = (code) => {
    for (const condition of Object.values(weatherConditions)) {
      if (condition[code] && condition[code].hasOwnProperty("icon")) {
        return condition[code].icon;
      }
    }
    return "default-icon";
  };

  const getOutfit = (temperature, weather_code) => {
    let selectedOutfit = outfits.default;
    if (weather_code && weatherConditions.wet[weather_code]) {
      if (temperature >= 5 && temperature <= 25) {
        selectedOutfit = outfits.rainy;
      } else if (temperature < 5) {
        selectedOutfit = outfits.snowy;
      }
    } else if (weather_code && weatherConditions.dry[weather_code]) {
      if (temperature >= 20) {
        selectedOutfit = outfits.warm;
      } else if (temperature >= 7 && temperature <= 12) {
        selectedOutfit = outfits.windy;
      } else if (temperature > 12 && temperature < 20) {
        selectedOutfit = outfits.chilly;
      } else if (temperature < 7) selectedOutfit = outfits.snowy;
    } else if (weather_code && weatherConditions.snow[weather_code]) {
      selectedOutfit = outfits.snowy;
    }

    return selectedOutfit;
  };

  return (
    <Container className={`${appStyles.Section} ${styles.Section} text-center`}>
      <Row className="align-items-center">
        <Col className="d-flex">
          <p className="m-0">Choose a date:</p>
        </Col>
        <Col>
          <input
            type="date"
            value={inputDate}
            min="2009-01-01"
            onChange={handleInputDateChange}
            className={`${styles.Input} ${styles.InputDate}`}
          />
        </Col>
      </Row>
      <Row className="py-1 m-auto">
        <Col>
          {historicalWeatherData ? (
            <Image
              src={
                getOutfit(
                  historicalWeatherData.temperature,
                  historicalWeatherData.weather_code
                ).image
              }
              style={{ height: isSmallScreen ? 300 : 500 }}
              alt="Outfit"
            />
          ) : (
            <Image
              src={image}
              style={{ height: isSmallScreen ? 300 : 500 }}
              alt="Outfit"
            />
          )}
        </Col>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          historicalWeatherData && (
            <div className="d-block">
              <Row className="justify-content-center">
                <div className={styles.Location}>
                  {locationData.country === "United States of America" ? (
                    <p>
                      On <span className="fw-bold">{inputDate}</span> in{" "}
                      <span className="fw-bold">
                        {locationData.name}, {locationData.region}
                      </span>{" "}
                      it was
                    </p>
                  ) : (
                    <p className="fw-bold">
                      {inputDate} in {locationData.name}, {locationData.country}
                    </p>
                  )}
                </div>
              </Row>
              <Row className={`${styles.ConditionsContainer}`}>
                <Col className="d-flex justify-content-end">
                  <Image
                    src={getWeatherIcon(historicalWeatherData.weather_code)}
                    alt="Weather Icon"
                    height={65}
                  />
                </Col>
                <Col className={`${styles.Conditions} m-auto`}>
                  <p className="d-flex mb-0">
                    {historicalWeatherData.weather_descriptions}
                  </p>
                  <p className="d-flex mb-0">
                    {historicalWeatherData.temperature}
                    °C
                  </p>
                </Col>
              </Row>
            </div>
          )
        )}
      </Row>
    </Container>
  );
};

export default HistoricalWeather;
