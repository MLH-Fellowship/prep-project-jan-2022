/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Carousel from 'react-grid-carousel';

import WeatherCard from './WeatherCard';

function ForecastCarousel({ forecastData }) {
  const [items] = useState(forecastData);
  const [selector, setSelector] = useState(['7 Days', '7 Hours']);
  const [selectedValue, setSelectedValue] = useState('7 Days');

  return (
    <>
      <div className="selector">
        <span className="label">Showing weather for next</span>
        {/* eslint-disable jsx-a11y/no-onchange */}
        <select
          onChange={(e) => {
            setSelectedValue(e.target.value);
            console.log('This is the e ', e.target.value);
          }}
        >
          {selector.map((value) => (
            <option key={value} value={value} className="option-card">
              {value}
            </option>
            // {setSelectedValue(value)}
          ))}
        </select>
      </div>
      <Carousel
        cols={4}
        rows={1}
        gap={5}
        loop={false}
        hideArrow={false}
        showDots
        responsiveLayout={[
          {
            breakpoint: 550,
            cols: 2,
            rows: 1,
            gap: 10,
            loop: true,
          },
          {
            breakpoint: 800,
            cols: 3,
            rows: 1,
            gap: 0,
            loop: true,
          },
        ]}
      >
        {selectedValue === '7 Days' &&
          items.daily.map((item) => (
            <Carousel.Item key={item}>
              <WeatherCard value={selectedValue} data={item} />
            </Carousel.Item>
          ))}
        {selectedValue === '7 Hours' &&
          items.hourly.map((item) => (
            <Carousel.Item key={item}>
              <WeatherCard value={selectedValue} data={item} />
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
}

export default ForecastCarousel;
