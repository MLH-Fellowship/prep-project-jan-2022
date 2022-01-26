/**
 * An API wrapper for OpenWeatherMap's One Call API with built-in result
 * caching.
 * @module OpenWeatherMap
 */

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
const geocodingEndpoint = 'geo/1.0/direct?q={name}&limit=1&appid={apiKey}'

/**
 * API class for OpenWeatherMap
 * @class
 * @public
 * @constructor
 */
export default class OpenWeatherMap {

  /**
   * OpenWeatherMap API key.
   * @type {string}
   */
  #apiKey;

  /**
   * Cache of responses to the One Call API.
   * @type {Map<Geolocation, Object>}
   */
  #callCache;

  /**
   * Cache of responses from the Direct Geocoding API.
   * @type {Map<string, Geolocation>}
   */
  #geoCodingCache;

  /**
   * @param apiKey An API key for https://openweathermap.org
   */
  constructor(apiKey) {
    this.#apiKey = apiKey;
    this.#callCache = new Map();
    this.#geoCodingCache = new Map();
  }

  /**
   * Get the one-call API response for a set of coordinates. Checks the cache,
   * calling the API only if the response is not cached.
   * @param {Geolocation|string} location  The location, either as a string or as a {lat, lon} object.
   * @returns {object} The API response, somewhat parsed.
   */
  async getData(location) {
    const coordinates = (typeof location === 'string') ?
      this.#resolveLocationName(location) :
      location;

    if (this.#callCache.has(coordinates)) {
      return this.#callCache.get(coordinates);
    }

    const callUrl = this.#getOneCallEndpointUrl(coordinates);
    const response = await (await fetch(callUrl)).json();

    const {
      timezone, timezone_offset, current, minutely, hourly,
      daily, alerts,
    } = response;

    const parsedResponse =  {
      /** @type {Geolocation} */
      location: coordinates,
      /** {@type {string}} */
      tz: timezone,
       /** @type {number} */
      tzOffset: timezone_offset,
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
    }

    this.#callCache.set(coordinates, parsedResponse);

    return parsedResponse;
  }

  /**
   * Clear the API call cache.
   * @returns {void}
   */
  clearCallCache() {
    this.#callCache.clear();
  }

  /**
   * Get the url for the One Call API endpoint for a set of coordinates.
   * @param {Geolocation} coordinates
   * @returns {string}
   */
  #getOneCallEndpointUrl(coordinates) {
    const url = baseUrl + oneCallEndpoint;

    return url.replace('{lat}', coordinates.lat)
      .replace('{lon}', coordinates.lon)
      .replace("{apiKey}", this.#apiKey);
  }

  /**
   * Resolve a location (by name) to a {@see Geolocation} instance.
   * @param {string} name
   * @throws {Error} On failure to resolve location.
   * @returns {Geolocation}
   */
  async #resolveLocationName(name) {
    name = encodeURIComponent(name);

    if (this.#geoCodingCache.has(name)) {
      return this.#geoCodingCache.get(name);
    }

    const url = this.#getGeocodingEndpointUrl(name);

    const response = await (await fetch(url)).json();

    if (response[0] !== undefined) {
      const { /** @type {number} */ lat,
        /** @type {number} */ lon,
      } = response[0];
      const coordinates = new Geolocation(lat, lon);

      this.#geoCodingCache.set(name, coordinates)

      return coordinates;
    }

    throw new Error("cannot resolve name to location");
  }

  /**
   * Get the url for the Direct Geocoding API endpoint for a location name.
   * @param name
   * @returns {string}
   */
  #getGeocodingEndpointUrl(name) {
    const url = baseUrl + geocodingEndpoint;

    return url.replace('{name}', name)
      .replace('{apiKey}', this.#apiKey);
  }
}


/**
 * Geolocation (lat, long) for a location.
 * @class
 * @private
 * @constructor
 */
class Geolocation {
  constructor(lat, long) {
    this.lat = lat;
    this.lon = long;
  }
}
