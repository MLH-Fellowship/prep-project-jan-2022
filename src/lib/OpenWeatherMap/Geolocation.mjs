/**
 * @module GeoLocation
 */

/**
 * Geolocation (lat, long) for a location.
 * @class
 * @private
 * @constructor
 */
export default class Geolocation {
  /**
   * @param {number} lat
   * @param {number} long
   * @param {string} name
   * @param {string} country
   */
  constructor(lat, long, name, country) {
    this.lat = lat;
    this.lon = long;
    this.name = name;
    this.country = country;
  }
}
