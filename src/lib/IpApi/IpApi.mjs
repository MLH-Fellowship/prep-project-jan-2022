/**
 * API wrapper for the 'https://ipapi.co' JSON API
 * @module
 */

const apiEndpoint = 'https://ipapi.co/{IP}/json/';

/**
 * API Wrapper class for https://ipapi.co/json/
 */
export default class IpApi {
  /**
   * Query the IP Geolocation API
   * @param {string} ip  IP Address to query. If none is passed, the current IP is queried by default server side.
   * @returns object  The response, parsed.
   */
  async query(ip = '') {
    const queryUrl = (() => {
      const sub = ip || '';
      return apiEndpoint.replace('{IP}', sub);
    })();

    const response = await (await fetch(queryUrl)).json();
    const {
      ip: clientIp,
      version: ipVersion,
      city,
      region,
      region_code: regionCode,
      country_code: countryCode,
      country_code_iso3: countryCodeIso3,
      country_name: countryName,
      country_capital: countryCapital,
      country_tld: countryTld,
      continent_code: continentCode,
      in_eu: inEU,
      postal,
      latitude,
      longitude,
      timezone,
      utc_offset: utcOffset,
      country_calling_code: countryCallingCode,
      currency,
      currency_name: currencyName,
      languages,
      country_area: countryArea,
      country_population: countryPopulation,
      asn,
      org,
      hostname,
    } = response;

    return {
      clientIp,
      ipVersion,
      city,
      region,
      regionCode,
      countryCode,
      countryCodeIso3,
      countryName,
      countryCapital,
      countryTld,
      continentCode,
      inEU,
      postal,
      latitude,
      longitude,
      timezone,
      utcOffset,
      countryCallingCode,
      currency,
      currencyName,
      languages,
      countryArea,
      countryPopulation,
      asn,
      org,
      hostname,
    };
  }
}
