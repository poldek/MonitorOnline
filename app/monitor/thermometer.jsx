"use client";

import React from "react";
import { useEffect, useState } from "react";
import supabase from "../../utils/supabase-browser";
import moment from "moment";
// import dynamic from "next/dynamic.js";
// import ChartTemperature from "./chartTemperature";
// const ChartTemperature = dynamic(() => import("./chartTemperature"), {
//   ssr: false,
// });

export default function Thermometer({ monitor }) {
  //console.log("Monitor ");
  const [data, setData] = useState(monitor);
  const [temp, setTemp] = useState(0);
  const [spo2, setSpo2] = useState(0);
  const [status, setStatus] = useState(0);
  const [battery, setBattery] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    data.map((m) => {
      if (m.id == 1) {
        setTemp(m.value);
        setStatus(m.status);
        setDateTime(m.updated_at);
        setBattery(m.battery);
        setAddress(m.address);
      } else if (m.id == 2) {
        setSpo2(m.value);
      }
    });
    setData(monitor);
  }, [monitor]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "monitor" },
        (payload) => {
          setData({ ...data, ...payload.new });
          if (payload.new.id === 1) {
            setTemp(payload.new.value);
            setStatus(payload.new.status);
            setDateTime(payload.new.updated_at);
            setBattery(payload.new.battery);
            setAddress(payload.new.address);
          } else {
            //for another sensor
            setSpo2(payload.new.value);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [monitor]);

  return (
    <div className="overflow-hidden shadow sm:rounded-lg mg-aute">
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
              d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
            />
          </svg>

          <h3 className="text-sm font-medium leading-6 text-black">
            Thermometer inside the house
          </h3>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          hardware temperature sensor
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm font-bold text-black sm:col-span-2 sm:mt-0">
              {status === 1
                ? "Thermometr Connected"
                : "Thermometr Disconnected"}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Themperature</dt>

            <dd className="mt-1 text-sm font-bold text-black sm:col-span-2 sm:mt-0">
              {temp.toFixed(2)}&#x2103;
              <div className="h-1 w-full bg-gray-300">
                <div
                  style={{ width: `${temp.toFixed(2)}%` }}
                  className={`h-full ${
                    temp.toFixed(2) < 20 ? "bg-red-600" : "bg-green-600"
                  }`}
                ></div>
                <code className="text-sm text-gray-500">
                  if the temperature is less than 20 degrees show a red label
                </code>
              </div>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Battery</dt>
            <dd className="mt-1 text-sm font-bold text-black sm:col-span-2 sm:mt-0">
              {battery}%
              <div className="h-1 w-full bg-gray-300">
                <div
                  style={{ width: `${battery}%` }}
                  className={`h-full ${
                    battery < 30 ? "bg-red-600" : "bg-green-600"
                  }`}
                ></div>
                <code className="text-sm text-gray-500">
                  if the battery is less than 30 percent show a red label
                </code>
              </div>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date/time</dt>
            <dd className="mt-1 text-sm font-bold text-black sm:col-span-2 sm:mt-0">
              {moment(dateTime).utc().format("YYYY-MM-DD HH:mm:ss")}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm font-bold text-black sm:col-span-2 sm:mt-0">
              {address}
            </dd>
          </div>
          {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Chart</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ChartTemperature value={temp.toFixed(2)} />
            </dd>
          </div> */}
        </dl>
      </div>
    </div>
  );
}
