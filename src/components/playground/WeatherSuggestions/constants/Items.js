import RainCoat from '../../../../assets/lottiefiles/thunderstorm.json';
import RubberBoots from '../../../../assets/lottiefiles/rainboots.json';
import Flashlight from '../../../../assets/lottiefiles/battery.json';
import Umbrella from '../../../../assets/lottiefiles/umbrella.json';
import Jacket from '../../../../assets/lottiefiles/snow.json';
import Gloves from '../../../../assets/lottiefiles/igloo.json';
import SnowBoots from '../../../../assets/lottiefiles/fireplace.json';
import Sunglasses from '../../../../assets/lottiefiles/sunglasses.json';
import BaseballCap from '../../../../assets/lottiefiles/cap.json';
import SunCream from '../../../../assets/lottiefiles/beach.json';
import Watch from '../../../../assets/lottiefiles/watch.json';

const items = {
  Thunderstorm: {
    RainCoat: RainCoat,
    RubberBoots: RubberBoots,
    Flashlight: Flashlight,
  },
  Drizzle: {
    Umbrella: Umbrella,
  },
  Rain: {
    RainCoat: RainCoat,
    Umbrella: Umbrella,
  },
  Snow: {
    Jacket: Jacket,
    Gloves: Gloves,
    SnowBoots: SnowBoots,
  },
  Clear: {
    Sunglasses: Sunglasses,
    BaseballCap: BaseballCap,
    SunCream: SunCream,
  },
  Clouds: {
    BaseballCap: BaseballCap,
    Watch: Watch,
  },
  Mist: {},
  Smoke: {},
  Haze: {},
  Dust: {},
  Fog: {},
  Sand: {},
  Ash: {},
  Squall: {},
  Tornado: {},
};

export default items;
