import { useEffect } from "react";
import rain from './assets/audio/LightRain.mp3';
import {Howl} from "howler";

function Sound(props) {

    //const weatherName = props.results.weather[0].main;

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

        // Error: UseEffect is being called multiple times
        console.log("useEffect called");
        
        sound = new Howl({
            src: [rain]
        });

        sound.play();

    });


    return(
        <div>
            <button type="button" onClick={toggleSound}>Toggle Sound</button>
        </div>
    );
}

export default Sound;