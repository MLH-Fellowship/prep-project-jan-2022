import React, { useEffect, useState } from 'react';
import './Suggestions.css';
import weatherItems from './constants/Items';
import LottieControl from './Lottie';
import animationData from '../../../assets/lottiefiles/umbrella.json';

export default function WeatherSuggestions(results) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Set items according to the weather
    const weatherName = results?.results?.weather[0]?.main ?? 'Snow';
    setItems(weatherItems[weatherName]);
  }, [results?.results?.weather]);
  return (
    <div>
      {/* Traverse through the items map */}
      {Object.keys(items).length > 0 && (
        <>
          <h3>Make sure to carry these today</h3>
          <div className="required-things">
            {Object.keys(items).map((item, i) => (
              <div key={item} className="required-item">
                {/* <img src={items[item]} /> */}
                <LottieControl animationData={animationData}/>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
