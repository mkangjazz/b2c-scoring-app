function sortCitiesByFactoryCount(cities) {
    var leaderBoard = {};

    cities.map(city => {
        const score = String(city["score"]["numFactories"]);

        if (
            !leaderBoard.hasOwnProperty(score) &&
            score !== '0'
        ) {
            leaderBoard[score] = [];
        }

        if (score !== '0') {
            leaderBoard[score].push(city.token);
        }

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
        leaderBoard.secondHasThisManyFactories = arr[1];

        return;
    }

    sortFactoryCounts();

    cities.map(city => {
        const firstPlaceArray = leaderBoard[leaderBoard.firstHasThisManyFactories];
        const secondPlaceArray = leaderBoard[leaderBoard.secondHasThisManyFactories];

        // default case
        city["score"]["factoryMultiplier"] = 2;
        city["score"]["factoryBonus"] = '';

        if (firstPlaceArray) {
            if (firstPlaceArray.indexOf(city.token) !== -1) {
                city["score"]["factoryMultiplier"] = 4;
                city["score"]["factoryBonus"] = 'Most Factories';
            }
        }

        if (secondPlaceArray) {
            if (secondPlaceArray.indexOf(city.token) !== -1) {
                city["score"]["factoryMultiplier"] = 3;
                city["score"]["factoryBonus"] = 'Second Most Factories';
            }
        }

        return false;
    });
}

export default sortCitiesByFactoryCount;