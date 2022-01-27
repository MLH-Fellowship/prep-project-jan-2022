import { Howl } from 'howler';
import './WeatherSounds.css';
import rain from '../../assets/audio/LightRain.mp3';
import snow from '../../assets/audio/Snow.mp3';
import drizzle from '../../assets/audio/RainBackVerandah.mp3';
import thunderstorm from '../../assets/audio/RollingThunder.mp3';
import dummyWind from '../../assets/audio/dummyWind.mp3';

const soundMap = {
  Thunderstorm: thunderstorm,
  Drizzle: drizzle,
  Rain: rain,
  Snow: snow,
};

function WeatherSounds({ weatherName }) {
  let isSoundOn = false;

  const weatherSound = soundMap[weatherName] ?? dummyWind;

  const sound = weatherSound
    ? new Howl({
        src: [weatherSound],
        loop: true,
      })
    : null;

  const toggleSound = () => {
    isSoundOn = !isSoundOn;

    if (sound !== null) {
      if (isSoundOn) {
        sound.play(undefined, false);
      } else {
        sound.stop(undefined, false);
      }
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
