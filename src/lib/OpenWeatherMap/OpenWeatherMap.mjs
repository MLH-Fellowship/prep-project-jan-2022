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
     * @type {Map<Geolocation, Object>}
     */
    this._callCache = new Map();

    /**
     * Cache of responses from the Direct Geocoding API.
     * @type {Map<string, Geolocation>}
     */
    this._geoCodingCache = new Map();
  }

  /**
   * Get the one-call API response for a set of coordinates. Checks the cache,
   * calling the API only if the response is not cached.
   * @param {Geolocation|string} location  The location, either as a string or as a {lat, lon} object.
   * @returns {object} The API response, somewhat parsed.
   */
  async getData(location) {
    const coordinates =
      typeof location === 'string'
        ? this._resolveLocationName(location)
        : location;

    if (this._callCache.has(coordinates)) {
      return this._callCache.get(coordinates);
    }

    const callUrl = this._getOneCallEndpointUrl(coordinates);
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
      location: coordinates,
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

    this._callCache.set(coordinates, parsedResponse);

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
      .replace('{lat}', coordinates.lat)
      .replace('{lon}', coordinates.lon)
      .replace('{apiKey}', this._apiKey);
  }

  /**
   * Resolve a location (by name) to a {@see Geolocation} instance.
   * @param {string} name
   * @throws {Error} On failure to resolve location.
   * @returns {Geolocation}
   */
  async _resolveLocationName(name) {
    const cleanName = encodeURIComponent(name);

    if (this._geoCodingCache.has(cleanName)) {
      return this._geoCodingCache.get(cleanName);
    }

    const url = this._getGeoCodingEndpointUrl(cleanName);

    const response = await (await fetch(url)).json();

    if (response[0] !== undefined) {
      const { /** @type {number} */ lat, /** @type {number} */ lon } =
        response[0];
      const coordinates = new Geolocation(lat, lon);

      this._geoCodingCache.set(cleanName, coordinates);

      return coordinates;
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
}
