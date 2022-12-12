"use client";

import { useState } from "react";
import Loader from "../loader";
import WeatherDisplay from "./weatherDisplay";
import Toast from "./toast";

async function getData(city) {
  const data = {
    search: city,
  };
  const url = "/api/weather";
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  };
  const response = await fetch(url, postData, { next: { revalidate: 10 } });

  return response.json();
}

export default function Weather() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handlerSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const dataWeather = await getData(search);
    //console.log(JSON.stringify(dataWeather, null, 2));

    if (dataWeather.data.cod === 200) {
      setWeather(dataWeather);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="overflow-hidden shadow sm:rounded-lg mg-aute mt-6">
      {isLoading ? <Loader /> : ""}
      <div className="flex justify-center items-center">
        {error ? <Toast /> : ""}
      </div>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex space-x-2 items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"
            />
          </svg>
          <h3 className="text-sm font-medium leading-6 text-black">
            Current Weather
          </h3>

          <form className="flex flex-auto" onSubmit={handlerSearch}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search city"
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>

        <p className="mt-1 max-w-2xl text-sm text-gray-500">weather outside</p>
      </div>

      {weather && !error && !isLoading ? (
        <WeatherDisplay weather={weather} />
      ) : (
        ""
      )}
    </div>
  );
}
