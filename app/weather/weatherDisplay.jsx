import React from "react";
import WeatherImage from "./weatherImage";
import LocaleTime from "../components/LocaleTime";
import StaticMap from "../components/StaticMap";

function WeatherDisplay({ weather }) {
  const fullCityCountry = (weather) => {
    const {
      data: { name },
      data: {
        sys: { country },
      },
    } = weather;
    return `${name} ${country}`;
  };

  const fuullWeatherDescription = (weather) => {
    const {
      data: {
        weather: {
          [0]: { main, description },
        },
      },
    } = weather;

    return `${main} ${description}`;
  };

  return (
    <div className="border-t border-gray-200">
      <dl>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            <br />
            Current Temperature <br />
            Icon and Local time
          </dt>
          <dd className="mt-1 text-2xl text-gray-900 sm:col-span-2 sm:mt-0">
            <div className="mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg">
              <div className="flex flex-wrap justify-center items-center  text-gray-500 sm:justify-between">
                {weather.data ? weather.data.main.temp : ""}&#x2103;
                {weather.data ? (
                  <WeatherImage
                    weatherImage={weather.data.weather[0].icon}
                    description=""
                  />
                ) : (
                  ""
                )}
                {weather.data ? (
                  <LocaleTime offset={weather.data.timezone} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">City</dt>
          <dd className="mt-1 text-sm  text-gray-500 sm:col-span-2 sm:mt-0">
            {fullCityCountry(weather)}
          </dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Weather</dt>
          <dd className="mt-1 text-sm  text-gray-500 sm:col-span-2 sm:mt-0">
            {fuullWeatherDescription(weather)}
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Wind</dt>
          <dd className="mt-1 text-sm  text-gray-500 sm:col-span-2 sm:mt-0">
            {weather.data ? weather.data.wind.speed : ""}mph
          </dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Clouds</dt>
          <dd className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
            {weather.data ? weather.data.clouds.all : ""}
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Temp max</dt>
          <dd className="mt-1 text-sm  text-gray-500 sm:col-span-2 sm:mt-0">
            {weather.data ? weather.data.main.temp_max : ""}&#x2103;
          </dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Temp min</dt>
          <dd className="mt-1 text-sm   text-gray-500 sm:col-span-2 sm:mt-0">
            {weather.data ? weather.data.main.temp_min : ""}&#x2103;
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Humidity</dt>
          <dd className="mt-1 text-sm  text-gray-500 sm:col-span-2 sm:mt-0">
            {weather.data ? weather.data.main.humidity : ""}%
          </dd>
        </div>
      </dl>
      <StaticMap weatherData={weather.data} size={[1228, 380]} />
    </div>
  );
}

export default WeatherDisplay;
