import RainCoat from '../../../assets/lottiefiles/thunderstorm.json';
import RubberBoots from '../../../assets/lottiefiles/rainboots.json';
import Flashlight from '../../../assets/lottiefiles/battery.json';
import Umbrella from '../../../assets/lottiefiles/umbrella.json';
import Jacket from '../../../assets/lottiefiles/snow.json';
import Gloves from '../../../assets/lottiefiles/igloo.json';
import SnowBoots from '../../../assets/lottiefiles/fireplace.json';
import Sunglasses from '../../../assets/lottiefiles/sunglasses.json';
import BaseballCap from '../../../assets/lottiefiles/cap.json';
import SunCream from '../../../assets/lottiefiles/beach.json';
import Watch from '../../../assets/lottiefiles/watch.json';
import Fog from '../../../assets/lottiefiles/fog.json';
import Mist from '../../../assets/lottiefiles/mist.json';
import Warm from '../../../assets/lottiefiles/warm.json';

const items = [
  {
    type: 'clouds',
    weatherItems: ['Baseball Cap', 'Watch'],
    animations: [BaseballCap, Watch],
  },
  {
    type: 'storm',
    weatherItems: ['Raincoat', 'Rubber Boots', 'Flash Light'],
    animations: [RainCoat, RubberBoots, Flashlight],
  },
  {
    type: 'fog',
    weatherItems: ['Drive slowly', 'Stay warm'],
    animations: [Fog, Warm],
  },
  {
    type: 'rain',
    weatherItems: ['Raincoat', 'Umbrella'],
    animations: [RainCoat, Umbrella],
  },
  {
    type: 'mist',
    weatherItems: ['Jacket', 'Gloves'],
    animations: [Mist, Jacket, Gloves],
  },
  {
    type: 'snow',
    weatherItems: ['Jacket', 'Gloves', 'Snowboots'],
    animations: [Jacket, Gloves, SnowBoots],
  },
  {
    type: 'clear',
    weatherItems: ['Sunglasses', 'Baseball Cap', 'Sun Cream'],
    animations: [Sunglasses, BaseballCap, SunCream],
  },
];

//   Mist: {},
//   Smoke: {},
//   Haze: {},
//   Dust: {},
//   Fog: {},
//   Sand: {},
//   Ash: {},
//   Squall: {},
//   Tornado: {}

export default items;
