import React, { useState, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  Tooltip,
} from 'react-leaflet';
import { Geolocation } from '../../lib/OpenWeatherMap';
import './WeatherMap.css';

/**
 * Default coordinates for the map to pin on.
 * @type {Object}
 */
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

  const SetMarkerDynamically = ({ loc, setLocQuery }) => {
    useMapEvent('click', (e) => {
      setLocQuery({ lat: e.latlng.lat, lon: e.latlng.lng });
    });

    return (
      <Marker position={[loc.lat, loc.lon]}>
        <Tooltip
          direction="right"
          offset={[0, 0]}
          opacity={1}
          permanent
        >{`${loc.name}, ${loc.country}`}</Tooltip>
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
          whenCreated={(m) => setMap(m)}
          center={
            location
              ? [location.lat, location.lon]
              : [defaultLocation.lat, defaultLocation.lon]
          }
          doubleClickZoom
          scrollWheelZoom={false}
          zoom={7}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SetMarkerDynamically
            locQ={locationQuery}
            setLocQuery={setLocationQuery}
            loc={location ?? defaultLocation}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default WeatherMap;
