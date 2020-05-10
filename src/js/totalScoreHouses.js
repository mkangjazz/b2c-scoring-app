function totalScoreHouses(city){
    var score = 0;

    score = score + city.score.housesNextToFactories;
    score = score + ((city.score.numHouses - city.score.housesNextToFactories) * city.score.nonHouseTypes.filter(x => x).length);

    return score;
}

export default totalScoreHouses;