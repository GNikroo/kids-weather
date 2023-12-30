import React, { useCallback, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import useWeatherStore from "./hooks/useWeatherStore";
import ScreenSizeChecker from "../components/hooks/ScreenSizeChecker";

const libraries = ["places"];

const Map = () => {
  const { handleMapClick } = useWeatherStore();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });
  const { isSmallScreen } = ScreenSizeChecker();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const mapContainerStyle = isSmallScreen
    ? { height: "10rem", width: "20rem" }
    : { height: "20rem", width: "25rem" };

  const center = {
    lat: 0,
    lng: 0,
  };

  const handleMapClickEvent = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    handleMapClick(lat, lng);
    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new window.google.maps.Marker({
      position: { lat, lng },
      map: map,
    });
    setMarker(newMarker);
  };

  const onLoad = useCallback(function callback(map) {
    const worldBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(85, -180), // North-west corner of the world
      new window.google.maps.LatLng(-85, 180) // South-east corner of the world
    );
    map.fitBounds(worldBounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="d-flex align-items-center justify-content-center">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={1}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClickEvent}
      >
        {map && <Marker position={center} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
