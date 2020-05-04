function totalScoreFactories(city) {
    var score = 0;
    var multiplier = city.score.factoryMultiplier;
    var factories = city.score.numFactories;

    score = multiplier * factories;

    return {
        score: score,
    }
}

export default totalScoreFactories;