import utility from '../js/utility';
import gameTypes from './types/game';
import tokens from './types/tokens';
import tileTypes from './types/tiles';
// import tokensCapitals from './types/tokens';
// import tileTypesCapitals from './types/tiles_capitals';

const betweenTwoCitiesSetup = (function(){
	const game = gameTypes[0];
  let gameTiles;
  let gameTokens;

  if (game.id === 'original') {
    gameTiles = tileTypes;
	  gameTokens = tokens;
  }

	const cities = gameTokens.map(token => {
		const city = {};
		
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
			"nonHouseTypes": [],
			"uniqueTaverns": [],
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
				let tile = {};
        let coordinates;
				
        if (game.id === 'original') {
          coordinates = utility.convertNumberTo4x4Coordinates(index);  
        }
        
        if (game.id === 'capitals') {
          coordinates = utility.convertNumberTo5x5Coordinates(index);  
        }

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
    game: game,
		cities: cities,
		tileTypes: gameTiles,
	}
}());

export default betweenTwoCitiesSetup;
