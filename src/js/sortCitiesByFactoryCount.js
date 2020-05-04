function sortCitiesByFactoryCount(cities) {
    var leaderBoard = {};

    cities.map(city => {
        const score = String(city["score"]["numFactories"]);

        if (!leaderBoard.hasOwnProperty(score)) {
            leaderBoard[score] = [];
        }

        leaderBoard[score].push(city.token);

        return false;
    });

    function sortFactoryCounts() {
        var arr = [];

        for (var key in leaderBoard) {
            if (leaderBoard.hasOwnProperty(key)) {
                arr.push(key);
            }
        }

        arr.sort((b, a) => {
            return a - b;
        });

        leaderBoard.firstHasThisManyFactories = arr[0];
        leaderBoard.secondHasThisManyFactories = arr[1] || 0;

        return arr[0];
    }

    sortFactoryCounts();

    cities.map(city => {
        const firstPlaceArray = leaderBoard[leaderBoard.firstHasThisManyFactories];
        const secondPlaceArray = leaderBoard[leaderBoard.secondHasThisManyFactories];

        // default case
        city["score"]["factoryMultiplier"] = 2;
        city["score"]["factoryBonus"] = '';

        if (firstPlaceArray.indexOf(city.token) !== -1) {
            city["score"]["factoryMultiplier"] = 4;
            city["score"]["factoryBonus"] = 'Most Factories';
        }
        
        if (secondPlaceArray.indexOf(city.token) !== -1) {
            city["score"]["factoryMultiplier"] = 3;
            city["score"]["factoryBonus"] = 'Second Most Factories';
        }

        return false;
    });
}

export default sortCitiesByFactoryCount;