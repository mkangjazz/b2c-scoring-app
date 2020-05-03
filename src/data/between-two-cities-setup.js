// Arc de Triomphe, US Capitol, Brandenburg Gate, St Basil's, Big Ben, the White House, and the Forbidden City 
import utility from '../js/utility';

var betweenTwoCitiesSetup = (function(){
	var tokens = [
		'st-louis-arch',
		'taj-mahal',
		'colosseum',
		'golden-pavilion',
		'eiffel-tower',
		'pyramids',
		'sydney-harbour-bridge',
	];

	var tileTypes = [
		'factory',
		'house',
		'office',
		'park',
		'shop',
		'tavern-(bed)',
		'tavern-(drink)',
		'tavern-(food)',
		'tavern-(music)',
	];
	
	function convertNumberToCoordinates(number){
		var o = {
			x: number%4
		};

		if(number < 4){
			o["y"] = 0;
		}

		if(number >= 4 && number < 8){
			o["y"] = 1;
		}

		if(number >= 8 && number < 12){
			o["y"] = 2;
		}

		if(number >= 12 && number < 16){
			o["y"] = 3;
		}

		return o;
	}

	var cities = tokens.map(token => {
		var city = {};
		
		city["token"] = token;
		city["name"] = utility.getNameFromToken(token);
		city["tiles"] = [];
		city["score"] = {
			"numParks": 0,
			"numHouses": 0,
			"numFactories": 0,
			"numOffices": 0,
			"numShops": 0,
			"numTaverns": 0,
			"nonHouseTypes": 0,
			"uniqueTaverns": 0,
			"parkGroups": [],
			"shopGroups": [],
			"factoryMultiplier": 2,
			"officesNextToTaverns": 0,
			"housesNextToFactories": 0,
			"totalScoreParks": 0,
			"totalScoreOffices": 0,
			"totalScoreHouses": 0,
			"totalScoreFactories": 0,
			"totalScoreShops": 0,
			"totalScoreTaverns": 0,
			"totalScore": 0,
		};

		for(var i = 0; i < 16; i++){
			(function(index){
				var tile = {};
				var coordinates = convertNumberToCoordinates(index);

				tile["city"] = token;
				tile["number"] = index;
				tile["x"] = coordinates.x;
				tile["y"] = coordinates.y;
				tile["type"] = null;
				tile["typeSpecial"] = null;

				city["tiles"].push(tile);
			}(i));
		}

		return city;
	});

	return {
		cities: cities,
		tileTypes: tileTypes,
	}
}());

export default betweenTwoCitiesSetup;
