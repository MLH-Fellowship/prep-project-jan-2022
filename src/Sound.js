import { useEffect } from "react";
import rain from './assets/audio/LightRain.mp3';
import snow from './assets/audio/Snow.mp3';
import drizzle from './assets/audio/RainBackVerandah.mp3';
import thunderstorm from './assets/audio/RollingThunder.mp3';
import {Howl} from "howler";

function Sound(props) {

    const weatherName = props.results.weather[0].main;

    let isSoundOn = true;

    let sound = null;

    const toggleSound = () => {
        isSoundOn = !isSoundOn;

        if (isSoundOn) {
              
            sound.play();
        }

        else {
            sound.stop();
        }
    }

    useEffect(() => {

        console.log("useEffect called");

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
        
        sound = new Howl({
            src: [weatherSound],
            autoplay: true,
            loop: true
        });

    });


    return(
        <div className="soundButton">
            <label className="switch">
                <input type="checkbox" defaultChecked onChange={toggleSound}/>
                <span className="slider round"></span>
            </label>
        </div>
    );
}

export default Sound;