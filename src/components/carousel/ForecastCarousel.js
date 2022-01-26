import React, { useState } from 'react';
import Carousel from 'react-grid-carousel';

import WeatherCard from './WeatherCard';

function ForecastCarousel() {
  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  return (
    <Carousel
      cols={3}
      rows={1}
      gap={5}
      loop={false}
      hideArrow={false}
      showDots
      responsiveLayout={[
        {
          breakpoint: 800,
          cols: 2,
          rows: 1,
          gap: 0,
          loop: true,
        },
      ]}
    >
      {items.map((item) => (
        <Carousel.Item key={item}>
          <WeatherCard />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ForecastCarousel;
