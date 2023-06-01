import { urlRegExp } from "./regularExpressions.js";
import cheerio from "cheerio";
/**
 * Validates a given URL
 * @param {string} url - URL to be validated
 * @returns {boolean} true or false
 */
export function isValidURL(url) {
  return !!urlRegExp.test(url);
}

/**
 * Synchronously decodes a given URI
 * @param {string} uri - URI to be decoded
 * @returns {string} Decoded URI
 */
export function decodeURI(uri) {
  return decodeURIComponent(uri);
}

/**
 * Asynchronously fetches the data from a given URL and returns the fetched HTML
 * @param {string} url - URL to fetch the data from
 * @returns {Promise<string>} The fetched html string
 */
export async function fetchHTML(url) {
  const response = await fetch(url);
  return response.text();
}

/**
 * Extracts data from a given html string using Cheerio selectors
 * @param {string} html - HTML to extract data from
 * @returns {object} An object with extracted data
 */
export function extractData(html) {
  const $ = cheerio.load(html);
  const title = $("title").text();
  const firstImgSrc = $("img").eq(0).attr("src");
  const description = $('meta[name="description"]').attr("content");

  return { title, firstImgSrc, description };
}
