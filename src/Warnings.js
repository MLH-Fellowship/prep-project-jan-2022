import { useState, useEffect } from "react";
// import App from "./App";
import "./style/main.css";
import warningImg from "./images/warning.jpeg";
import "./Warnings.css";
// import warning from "./images/warning.jpeg";

// .catch((err) => alert("Something is wrong!"));

function Warnings({ city }) {
  // const [city, setCity] = useState("Baghdad");
  // const [data, setData] = useState(null);
  // const [image, setImage] = useState(warningImg)
  const [info, setInfo] = useState("");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
  )
    .then((res) => res.json())
    .then((data) => console.log(data));

  const names = ["advit", "aniket", "emeka"];

  // useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, [city]);
  return (
    <div>
      <section>
        <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
          <div class="grid grid-cols-1 ">
            <div class="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl">
              <img
                class="flex-shrink-0 object-cover object-center w-16 h-16 mx-auto -mt-8 rounded-full shadow-xl aboslute"
                src={warningImg}
                alt="team"
              />
              <div class="p-6 lg:text-center">
                <span class="mb-8 text-xs font-semibold tracking-widest text-yellow-500 uppercase ">
                  {" "}
                  WEATHER WARNING
                </span>
                <h4 class="mt-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl ">
                  {" "}
                  Strong Winds
                </h4>
                <p class="mt-3 text-base leading-relaxed text-gray-500"></p>
                <p>{info}</p>
                <div class="mt-6">
                  <a
                    href=""
                    class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-stone-50 transition duration-500 ease-in-out transform bg-red-500 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    See Weather Guidelines{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Warnings;
