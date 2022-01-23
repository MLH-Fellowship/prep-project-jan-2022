/**
 *
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
 * Geolocation (lat, long) for a location.
 * @class
 * @private
 * @constructor
 */
class Geolocation {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }
}


/**
 * API class for OpenWeatherMap
 * @class
 * @public
 * @constructor
 */
export class OpenWeatherMap {

  /**
   * Cache of responses to the One Call API.
   * @type {Map<Geolocation, Object>}
   */
  #callCache;

  /**
   * Cache of responses from the Direct Geocoding API.
   * @type {Map<String, Geolocation>}
   */
  #geoCodingCache;

  /**
   * OpenWeatherMap API key.
   * @type {string}
   */
  #apiKey;

  /**
   * @param apiKey An API key for https://openweathermap.org
   */
  constructor(apiKey) {
    this.#apiKey = apiKey;
    this.#callCache = new Map();
    this.#geoCodingCache = new Map();
  }

  // main method -- feed responses into #callCache
  /**
   * Get the One Call API response corresponding to a location name. We use
   *
   * @param name
   */
  getApiResponse(name) {

  }

  /**
   *
   * @param name
   * @return Geolocation
   */
  resolveLocationName(name) {
    if (this.#geoCodingCache.has(name)) {
      return this.#geoCodingCache.get(name);
    }

    // resolve `name` to a set of coordinates with the Direct Geocoding API
    // ref: https://openweathermap.org/api/geocoding-api
    // ...
    // set `name` => `response` in the map and return the set of coordinates
    // as a Geolocation object.
  }

  /**
   * Get the one-call API response for a set of coordinates.
   * @param lat  The latitude of the location.
   * @param long The longitude for the location.
   */
  getAllPropertiesGeo(lat, long) {

  }

  // --- These methods call getAllProperties()
  // getWeatherResults()
  // getForecast()
  // getWeatherWarnings()

}

