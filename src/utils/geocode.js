const fetch = require("node-fetch");

// -------------------------------------------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------------------------------------------
const MAPBOX_API_KEY =
  "pk.eyJ1IjoiY2ZyaWFzIiwiYSI6ImNqaDJjZ251ZDAwNHUyd203aXh2ZDRtb3EifQ.SDCoYeAxFLnc0-y7hbHkJQ";

// -------------------------------------------------------------------------------------------------
// GEOCODE
// -------------------------------------------------------------------------------------------------

function geocode(searchString) {
  const encoded = encodeURIComponent(searchString);
  return fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?access_token=${MAPBOX_API_KEY}`
  )
    .then(res => res.json())
    .then(data => {
      if (data.features.length === 0) {
        throw new Error(`Coordinates not found for: ${searchString}`);
      }
      const match = data.features[0];

      const [lon, lat] = match.center;
      return { lon, lat, location: match.place_name };
    });
}

module.exports = geocode;
