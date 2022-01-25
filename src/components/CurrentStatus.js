import './CurrentStatus.css';
import bg from '../assets/cs-bg.png';

export default function CurrentStatus() {
  return (
    <div className="cs-container">
      <img className="cs-bg" src={bg} alt="" />
      <div className="cs-content">
        <div className="cs-main">
          <div className="cs-basics">
            <span className="temp">21C</span>
            <div className="cs-info">
              <span className="weather">Cloudy</span>
              <span className="stop">Stops around 2</span>
              <span className="feels-like">FEELS LIKE 15C</span>
            </div>
            <i className="wi wi-day-lightning" />
          </div>
        </div>
        <div className="cs-more">more</div>
      </div>
    </div>
  );
}
