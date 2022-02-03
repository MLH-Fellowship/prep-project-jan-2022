/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Suggestions.css';
import data from './constants/Items';
import LottieControl from './Lottie';
import facebook from '../../assets/images/fb.svg';
import twitter from '../../assets/images/twitter.svg';

export default function WeatherSuggestions({ results }) {
  const [items, setItems] = useState({});

  useEffect(() => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].type === results.weather[0].main.toLowerCase())
        setItems(data[i]);
    }
  }, [results, items]);

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
        {items.animations.map((item, idx) => (
          <div key={idx} className="required-item">
            <LottieControl animationData={item} />
          </div>
        ))}
      </Carousel>

      <div className="suggestions-list-container">
        <div className="suggestions-list">
          <h2>You might want to bring:</h2>
          {items.weatherItems.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="share-container">
          <h2 className="share-heading">Share on</h2>
          <div>
            <a
              className="twitter-share-button"
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebook} alt="facebook" />
            </a>
            <a
              className="twitter-share-button"
              href="https://twitter.com/intent/tweet?text=clouds"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitter} alt="twitter" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
