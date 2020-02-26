const fetch = require("node-fetch");

// -------------------------------------------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------------------------------------------
const DARK_SKY_API_KEY = "746de4c4d74994ba632c8c785be289d9";

const EXCLUDE = "";
const UNITS = "units=si";
const LANG = "lang=es";

// -------------------------------------------------------------------------------------------------
// FETCH WEATHER
// -------------------------------------------------------------------------------------------------

function forecast(lat, lon) {
  return fetch(
    `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lon}?${EXCLUDE}&${UNITS}&${LANG}&limit=1`
  )
    .then(res => res.json())
    .then(({ daily }) => {
      const forecastData = daily.data[0];
      if (!forecastData) {
        throw new Error(`Could not find forecast data for: ${lat},${lon}`);
      }

      return {
        forecast: forecastData.summary
      };
    });
}

module.exports = forecast;
