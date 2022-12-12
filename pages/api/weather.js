import axios from "axios";

export default async function handler(req, res) {
  const searchCity = req.body.data.search;

  const options = {
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      q: searchCity,
      units: "metric",
      appid: process.env.API_KEY_WEATHER,
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      return res.status(200).json({ data: response.data });
    })
    .catch(function (error) {
      return res.status(500).json({ data: error });
    });
}
