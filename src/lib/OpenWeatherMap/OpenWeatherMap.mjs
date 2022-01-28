/**
 * An API wrapper for OpenWeatherMap's One Call API with built-in result
 * caching.
 * @module OpenWeatherMap
 */

import Geolocation from './Geolocation.mjs';

/**
 * Base URL for the OpenWeatherMap API
 * @type {string}
 */
const baseUrl = 'https://api.openweathermap.org/';

/**
 * Relative endpoint for the One Call API. {parameters} need to be substituted.
 * @type {string}
 */
const oneCallEndpoint = 'data/2.5/onecall?lat={lat}&lon={lon}&appid={apiKey}';

/**
 * Relative endpoint for the Direct Geocoding API. {parameters} need to be substituted.
 * @type {string}
 */
const geocodingEndpoint = 'geo/1.0/direct?q={name}&limit=1&appid={apiKey}';

/**
 * Relative endpoint for the Reverse
 * @type {string}
 */
const reverseGeocodingEndpoint = 'geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid={apiKey}'

/**
 * Minimal API Wrapper for the OpenWeatherMap API with built-in caching.
 *
 * @class
 * @public
 * @constructor
 */
export default class OpenWeatherMap {
  /**
   * @param apiKey An API key for https://openweathermap.org
   */
  constructor(apiKey) {
    /**
     * OpenWeatherMap API key.
     * @type {string}
     */
    this._apiKey = apiKey;

    /**
     * Cache of responses to the One Call API.
     * @type {Map<String, Object>}
     */
    this._callCache = new Map();

    /**
     * Cache of responses from the Direct Geocoding API.
     * @type {Map<string, Geolocation>}
     */
    this._geoCodingCache = new Map();
  }

  /**
   * @typedef {Object} LatLng An object {lat, lon}
   * @property {number} lat The location's latitude.
   * @property {number} lon The location's longitude.
   */

  /**
   * Get the one-call API response for a set of coordinates. Checks the cache,
   * calling the API only if the response is not cached.
   * @param {LatLng|string} location  The location, either as a string or as a {lat, lon} object.
   * @throws {Error} On failure to resolve the location if a string is passed.
   * @returns {object} The API response, somewhat parsed.
   */
  async getData(location) {
    const geolocation = await this._resolveLocation(location);

    // We'll serialise the Geolocation to eliminate duplicity.
    const geolocationSerialized = JSON.stringify(geolocation);

    if (this._callCache.has(geolocationSerialized)) {
      return this._callCache.get(geolocationSerialized);
    }

    const callUrl = this._getOneCallEndpointUrl(geolocation);
    const response = await (await fetch(callUrl)).json();

    const {
      timezone,
      timezone_offset: tzOffset,
      current,
      minutely,
      hourly,
      daily,
      alerts,
    } = response;

    const parsedResponse = {
      /** @type {Geolocation} */
      location: geolocation,
      /** {@type {string}} */
      tz: timezone,
      /** @type {number} */
      tzOffset: tzOffset,
      /** @type {object} */
      current: current,
      /** @type {object} */
      minutely: minutely,
      /** @type {object} */
      hourly: hourly,
      /** @type {object} */
      daily: daily,
      /** @type {object} */
      alerts: alerts,
    };

    this._callCache.set(geolocationSerialized, parsedResponse);

    return parsedResponse;
  }

  /**
   * Clear the API call cache.
   * @returns {void}
   */
  clearCallCache() {
    this._callCache.clear();
  }

  /**
   * Get the url for the One Call API endpoint for a set of coordinates.
   * @param {Geolocation} coordinates
   * @returns {string}
   */
  _getOneCallEndpointUrl(coordinates) {
    const url = baseUrl + oneCallEndpoint;

    return url
      .replace('{lat}', coordinates.lat.toString())
      .replace('{lon}', coordinates.lon.toString())
      .replace('{apiKey}', this._apiKey);
  }

  /**
   * Resolve a location (by name or coordinates) to a {@see Geolocation} instance.
   * @param {string|LatLng} location
   * @throws {Error} On failure to resolve location.
   * @returns {Promise<Geolocation>}
   */
  async _resolveLocation(location) {
    if (!location) {
      throw new Error("invalid query");
    }

    const toKey = (loc) => typeof loc === 'string' ?
      encodeURIComponent(loc) :
      JSON.stringify(loc);

    const sanitize = (loc) => typeof loc === 'string' ?
      encodeURIComponent(loc) :
      loc;

    const getRequestUrl = (loc) => typeof loc === 'string' ?
      this._getGeoCodingEndpointUrl(loc) :
      this._getReverseGeoCodingEndpointUrl(loc);

    const cleanLocation = sanitize(location);
    const key = toKey(cleanLocation);

    if (this._geoCodingCache.has(key)) {
      return this._geoCodingCache.get(key);
    }

    const url = getRequestUrl(cleanLocation);

    try {
      const response = await (await fetch(url)).json();
      if (response[0] !== undefined) {
        const {
          /** @type {number} */ lat,
          /** @type {number} */ lon,
          /** @type {string} */ name: resolvedName,
          /** @type {string} */ country,
        } = response[0];
        const coordinates = new Geolocation(
          Number(lat),
          Number(lon),
          resolvedName,
          country
        );
        this._geoCodingCache.set(key, coordinates);

        return coordinates;
      }
    } catch (e) {
      console.error(`Failed to get response: ${e}`);
    }

    throw new Error('cannot resolve name to location');
  }

  /**
   * Get the url for the Direct Geocoding API endpoint for a location name.
   * @param name
   * @returns {string}
   */
  _getGeoCodingEndpointUrl(name) {
    const url = baseUrl + geocodingEndpoint;

    return url.replace('{name}', name).replace('{apiKey}', this._apiKey);
  }

  /**
   * Get the url for the Reverse Geocoding API endpoint for a set of coordinates
   * @param {LatLng} coordinates
   * @returns {string}
   * @private
   */
  _getReverseGeoCodingEndpointUrl(coordinates) {
    const url = baseUrl + reverseGeocodingEndpoint;

    return url.replace('{lat}', coordinates.lat.toString())
      .replace('{lon}', coordinates.lon.toString())
    .replace('{apiKey}', this._apiKey);
  }
}
