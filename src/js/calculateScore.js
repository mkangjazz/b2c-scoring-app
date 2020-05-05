import numTiles from './numTiles';
import nonHouseTypes from './nonHouseTypes';
import uniqueTaverns from './uniqueTaverns';
import housesNextToFactories from './housesNextToFactories';
import officesNextToTaverns from './officesNextToTaverns';
import totalScoreParks from './totalScoreParks';
import totalScoreOffices from './totalScoreOffices';
import totalScoreHouses from './totalScoreHouses';
import totalScoreShops from './totalScoreShops';
import totalScoreTaverns from './totalScoreTaverns';
import sortCitiesByFactoryCount from './sortCitiesByFactoryCount';
import totalScoreFactories from './totalScoreFactories';

var calculateScore = function(cities) {
    function setCounts(){
        cities.map(city => {
            city["score"]["numParks"] = numTiles(city.tiles, "park");
            city["score"]["numHouses"] = numTiles(city.tiles, "house");
            city["score"]["numFactories"] = numTiles(city.tiles, "factory");
            city["score"]["numOffices"] = numTiles(city.tiles, "office");
            city["score"]["numShops"] = numTiles(city.tiles, "shop");
            city["score"]["numTaverns"] = numTiles(city.tiles, "tavern");
            city["score"]["nonHouseTypes"] = nonHouseTypes(city.tiles);
            city["score"]["uniqueTaverns"] = uniqueTaverns(city.tiles);
            city["score"]["housesNextToFactories"] = housesNextToFactories(city.tiles);
            city["score"]["officesNextToTaverns"] = officesNextToTaverns(city.tiles);

            return false;
        });
    }

    function setTotals(){
        cities.map(city => {
            city["score"]["parkGroups"] = totalScoreParks(city.tiles).groups;
            city["score"]["totalScoreParks"] = totalScoreParks(city.tiles).score;
            city["score"]["totalScoreOffices"] = totalScoreOffices(city);
            city["score"]["totalScoreHouses"] = totalScoreHouses(city);
            city["score"]["totalScoreFactories"] = totalScoreFactories(city).score;
            city["score"]["totalScoreShops"] = totalScoreShops(city).score;
            city["score"]["shopGroups"] = totalScoreShops(city).groups;
            city["score"]["totalScoreTaverns"] = totalScoreTaverns(city);

            return false;
        });
    }

    function totalScore(city){
        var score = 0;

        var scores = [
            city["score"]["totalScoreParks"],
            city["score"]["totalScoreOffices"],
            city["score"]["totalScoreHouses"],
            city["score"]["totalScoreFactories"],
            city["score"]["totalScoreShops"],
            city["score"]["totalScoreTaverns"],
        ];

        score = scores.reduce((a, b) => a + b, 0);

        return score;
    }

    function setTotal(){
        cities.map(city => {
            city["score"]["totalScore"] = totalScore(city);

            return false;
        });
    }

    setCounts();
    sortCitiesByFactoryCount(cities);
    setTotals();
    setTotal();
};

export default calculateScore;
