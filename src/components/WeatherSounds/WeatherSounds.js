import { Howl } from 'howler';
import './WeatherSounds.css';
import rain from '../../assets/audio/LightRain.mp3';
import snow from '../../assets/audio/Snow.mp3';
import drizzle from '../../assets/audio/RainBackVerandah.mp3';
import thunderstorm from '../../assets/audio/RollingThunder.mp3';

function WeatherSounds({ weatherName }) {
  let isSoundOn = false;

  let weatherSound = null;

  switch (weatherName) {
    case 'Thunderstorm':
      weatherSound = thunderstorm;
      break;
    case 'Drizzle':
      weatherSound = drizzle;
      break;
    case 'Rain':
      weatherSound = rain;
      break;
    case 'Snow':
      weatherSound = snow;
      break;
    default:
      weatherSound = null;
  }

  const sound = new Howl({
    src: [weatherSound],
    loop: true,
  });

  const toggleSound = () => {
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
      sound.play();
    } else {
      sound.stop();
    }
  };

  return (
    <div className="soundButton">
      <label className="switch" htmlFor="soundCheckbox">
        <input type="checkbox" id="soundCheckbox" onChange={toggleSound} />
        <span className="slider round" />
      </label>
    </div>
  );
}

export default WeatherSounds;
