import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "../../styles/CurrentWeather.module.css";
import appStyles from "../../App.module.css";
import image from "../../assets/clothing/Child.png";
import ScreenSizeChecker from "../hooks/ScreenSizeChecker";
import useWeatherStore from "../hooks/useWeatherStore";
import useOutfit from "../hooks/useOutfit";
import Map from "../Map";

const CurrentWeather = () => {
  const {
    weatherData,
    inputLocation,
    locationData,
    isLoading,
    fetchWeatherData,
    fetchLocationData,
  } = useWeatherStore();

  const { getOutfit, getWeatherIcon } = useOutfit();

  const { isSmallScreen } = ScreenSizeChecker();

  useEffect(() => {
    fetchWeatherData();
  }, [inputLocation, fetchWeatherData]);

  useEffect(() => {
    fetchLocationData();
  }, [inputLocation, fetchLocationData]);

  return (
    <Container className={`${appStyles.Section} ${styles.Section} text-center`}>
      <Row className="py-1 m-auto">
        <Col>
          {weatherData ? (
            <Image
              src={
                getOutfit(weatherData.temperature, weatherData.weather_code)
                  .image
              }
              style={{ height: isSmallScreen ? 260 : 500 }}
              alt="Outfit"
            />
          ) : (
            <Image
              src={image}
              style={{ height: isSmallScreen ? 260 : 500 }}
              alt="Outfit"
            />
          )}
        </Col>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          weatherData && (
            <div className="d-block">
              <Row className="justify-content-center">
                <div className={styles.Location}>
                  <p className="fw-bold">
                    {locationData.name},{" "}
                    {locationData.country === "United States of America" ? (
                      <span>{locationData.region}</span>
                    ) : (
                      <span>{locationData.country}</span>
                    )}
                  </p>
                </div>
              </Row>
              <Row className={`${styles.ConditionsContainer}`}>
                <Col className="d-flex justify-content-end align-self-baseline">
                  <Image
                    src={getWeatherIcon(weatherData.weather_code)}
                    alt="Weather Icon"
                    height={50}
                  />
                </Col>
                <Col className={`${styles.Conditions} m-auto`}>
                  <p className="d-flex mb-0">
                    {weatherData.weather_descriptions}
                  </p>
                  <p className="d-flex mb-0">
                    {weatherData.temperature}
                    °C
                  </p>
                </Col>
              </Row>
              <Map />
            </div>
          )
        )}
      </Row>
    </Container>
  );
};

export default CurrentWeather;
