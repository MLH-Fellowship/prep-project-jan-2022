import RainCoat from "../assets/img/RainCoat.jpg";
import RubberBoots from "../assets/img/RubberBoots.jpg";
import Flashlight from "../assets/img/Flashlight.jpg";
import Umbrella from "../assets/img/Umbrella.png";
import Jacket from "../assets/img/Jacket.jpg";
import Gloves from "../assets/img/Gloves.jpg";
import SnowBoots from "../assets/img/SnowBoots.jpg";
import Sunglasses from "../assets/img/Sunglasses.jpg";
import BaseballCap from "../assets/img/BaseballCap.jpg";
import SunCream from "../assets/img/SunCream.jpg";
import Watch from "../assets/img/Watch.jpg";


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
