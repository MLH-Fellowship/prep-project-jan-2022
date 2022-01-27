import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Suggestions.css';
import weatherItems from './constants/Items';
import LottieControl from './Lottie';
import facebook from '../../../assets/images/fb.svg';
import twitter from '../../../assets/images/twitter.svg';

export default function WeatherSuggestions(results) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Set items according to the weather
    const weatherName = results?.results?.weather[0]?.main ?? 'Snow';
    setItems(weatherItems[weatherName]);
  }, [results?.results?.weather]);
  return (
    <div className="suggestions-container">
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
      <div className="suggestions-list-container">
        <div className="suggestions-list">
          <h2>You might want to bring:</h2>
          {Object.keys(items).length > 0 &&
            Object.keys(items).map((item) => <p key={item}>{item}</p>)}
        </div>
        <div className="share-container">
          <h2 className="share-heading">Share on</h2>
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
        </div>
      </div>
    </div>
  );
}
