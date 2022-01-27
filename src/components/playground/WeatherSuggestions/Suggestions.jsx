import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Suggestions.css';
import weatherItems from './constants/Items';
import LottieControl from './Lottie';

export default function WeatherSuggestions(results) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Set items according to the weather
    const weatherName = results?.results?.weather[0]?.main ?? 'Snow';
    setItems(weatherItems[weatherName]);
  }, [results?.results?.weather]);
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        swipeable={false}
        showArrows={false}
        showStatus={false}
        className="carousel"
      >
        {/* Traverse through the items map */}
        {Object.keys(items).length > 0 &&
          Object.keys(items).map((item) => (
            <div key={item} className="required-item">
              <LottieControl animationData={items[item]} />
            </div>
          ))}
      </Carousel>
    </div>
  );
}
