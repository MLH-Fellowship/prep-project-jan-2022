import React, { useState, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from 'react-leaflet';
import { Geolocation } from '../../lib/OpenWeatherMap';
import './WeatherMap.css';

/**
 * Default coordinates for the map to pin on.
 * @type {Object}
 */
// const defaultLocation = { lat: -14.235, lon: -51.9253, city: 'Sao Paulo' };
const defaultLocation = new Geolocation(
  -14.235,
  -51.9253,
  'Sao Paulo',
  'Brazil'
);

const defaultIcon = leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

leaflet.Marker.prototype.options.icon = defaultIcon;

const WeatherMap = ({
  locationQuery,
  setLocationQuery,
  /** @type {Geolocation} */
  location,
}) => {
  const [map, setMap] = useState();

  const SetMarkerDynamically = ({ city, setCity, cityCoordinates }) => {
    useMapEvent('click', (e) => {
      setCity({ lat: e.latlng.lat, lon: e.latlng.lng });
    });

    return (
      <Marker position={[cityCoordinates.lat, cityCoordinates.lon]}>
        <Popup>{city}</Popup>
      </Marker>
    );
  };

  useEffect(() => {
    if (!location) {
      return;
    }

    const mapCenter = [location.lat, location.lon];

    if (map) {
      if (map.getZoom() < 4) {
        map.setView(mapCenter, 7);
      } else {
        map.setView(mapCenter, map.getZoom());
      }
    }
  }, [map, location]);

  return (
    <>
      <div>
        <MapContainer
          className="map"
          whenCreated={setMap}
          center={
            location
              ? [location.lat, location.lon]
              : [defaultLocation.lat, defaultLocation.lon]
          }
          doubleClickZoom
          scrollWheelZoom
          zoom={7}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SetMarkerDynamically
            city={locationQuery}
            setCity={setLocationQuery}
            cityCoordinates={location ?? defaultLocation}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default WeatherMap;
