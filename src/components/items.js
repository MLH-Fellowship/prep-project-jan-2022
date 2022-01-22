import React, { useEffect, useState } from "react";
import neededItems from "../constants/items";

export default function NeededItems(results) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // set items according to the weather
    setItems(neededItems[results.results.weather[0].main]);
  }, [results.results.weather]);
  return (
    <div>
      {/* method 2 using map  */}
      {Object.keys(items).length > 0 && (
        <>
          <h3>Make sure to carry these today</h3>
          <div className="required-things">
            {Object.keys(items).map((item, i) => (
              <div className="required-item">
                <img src={items[item]} />
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
