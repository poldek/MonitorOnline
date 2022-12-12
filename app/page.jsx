import Thermometer from "./monitor/page";
import Weather from "./weather/page";
import { Suspense } from "react";
import Loader from "./loader";

export default function Home() {
  return (
    <section>
      <Suspense fallback={<Loader />}>
        <Thermometer />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Weather />
      </Suspense>
    </section>
  );
}
