import React, { useEffect } from "react";
import neededItems from "../constants/items";

export default function NeededItems() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // set items according to the weather
    setItems(neededItems[props.results.weather[0].main]);
  }, [props.results.weather]);
  return (
    <div>
      {/* method 2 using map  */}
      {Object.keys(items).length > 0 && (
        <>
          <h3>Make sure to carry these today</h3>
          <div className="required-things">
            {Object.keys(items).map((item, i) => (
              <div>
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
