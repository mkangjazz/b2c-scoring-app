import utility from './utility';

var calculateScore = function(cities){

    function numTiles(tiles, tileType){
        var genericType = utility.specificToGenericToken(tileType);
        var filteredArray = tiles.filter(obj => obj["type"] === genericType);

        return (filteredArray.length);
    }

    function nonHouseTypes(tiles){
        var typesFound = [];

        for(var i=0; i < tiles.length; i++){
            (function(index){
                if( !(typesFound.includes(tiles[index]["type"])) && tiles[index]["type"] !== 'house' ){
                    typesFound.push(tiles[index]["type"]);
                }
            }(i));
        }

        return typesFound.filter(x => x).length;
    }

    function uniqueTaverns(tiles){
        var tavernTypesFound = [];

        for(var i=0; i < tiles.length; i++){
            (function(index){
                if( !(tavernTypesFound.includes(tiles[index]["typeSpecial"])) && (tiles[index]["type"] === 'tavern') ){
                    tavernTypesFound.push(tiles[index]["typeSpecial"]);
                }
            }(i));
        }

        return (tavernTypesFound.filter(x => x).length);
    }

    function housesNextToFactories(tiles){
        var houseTiles = tiles.filter(obj => obj["type"] === 'house');
        var count = 0;
        
        for(var i=0; i < houseTiles.length; i++){
            (function(index){
                var adjacentTiles = utility.getAdjacentTiles(tiles, houseTiles[index], true);
                
                if(adjacentTiles.length > 0){
                    var adjacentFactories = adjacentTiles.filter(obj => obj["type"] === 'factory');
                    
                    if(adjacentFactories.length > 0){
                        count++;
                    }
                }
            }(i));
        }

        return count;
    }

    function officesNextToTaverns(tiles){
        var offices = tiles.filter(obj => obj["type"] === 'office');
        var count = [];

        for(var i=0; i < offices.length; i++){
            (function(index){
                var adjacentTiles = utility.getAdjacentTiles(tiles, offices[index], true);
                
                if(adjacentTiles.length > 0){
                    var adjacentFactories = adjacentTiles.filter(obj => obj["type"] === 'tavern');
                    
                    if(adjacentFactories.length > 0){
                        count++;
                    }
                }
            }(i));
        }

        return count;
    }

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
        });
    }

    function totalScoreParks(tiles){
        var score = 0,
            groupScore = 0,
            soloScore = 0;

        var parkGroups = makeParkGroups(tiles);

        function makeParkGroups(tiles){
            var parks = tiles.filter(obj => obj["type"] === "park");
            var parkGroups = [];
            var groupedParkGroups = [];
            var soloParks = [];
            
            for(var i=0; i < parks.length; i++){
                (function(index){
                    var parkGroup = [];
                    var adjacentTiles = utility.getAdjacentTiles(tiles, parks[index], true),
                        adjacentParks = adjacentTiles.filter(obj => obj["type"] === 'park');
    
                    if(adjacentParks.length > 0){
                        parkGroup.push(parks[index].number);
                        adjacentParks.map(obj => parkGroup.push(obj.number));
    
                        if(parkGroup.length > 0){
                            parkGroups.push(parkGroup);
                        }                        
                    } else {
                        soloParks.push(parks[index].number);
                    }
                }(i));
            }
    
            function groupArray(arr){
                var grouping;
    
                function reducer(accumulator, currentValue){
                    if(accumulator.some(v => currentValue.indexOf(v) >= 0)){
                        for(var i = 0; i < currentValue.length; i++){
                            (function(index){
                                if(!(accumulator.includes(currentValue[index]))){
                                    accumulator.push(currentValue[index]);
                                }
                            }(i));
                        }
                    }
    
                    return accumulator;
                }
    
                grouping = arr.reduce(reducer, arr[0]);
    
                return grouping;
            }
    
            function removeGroupedParks(arrayA, arrayB){
                var filteredArray = [];
                var flatGrouping = arrayB.reduce(function(accumulator, currentValue) {
                    return accumulator.concat(currentValue);
                }, []);
    
                arrayA.forEach((subArray) => {
                    if(!flatGrouping.includes(subArray[0])){
                        filteredArray.push(subArray);
                    } else {
                    }
                });
    
                return filteredArray;
            }
    
            while(parkGroups.length > 0){
                groupedParkGroups.push(groupArray(parkGroups));
                parkGroups = removeGroupedParks(parkGroups, groupedParkGroups);
            }
    
            return {
                groups: groupedParkGroups,
                solo: soloParks
            }
        }

        function scoreSoloParks(arr){
            var score = arr.length * 2;

            return score;
        }

        function scoreGroupParks(arr){
            var score = 0;

            arr.forEach(function(group){
                var groupScore = 0;

                if(group.length > 3){
                    groupScore = 12 + (group.length - 3);
                } else {
                    groupScore = group.length * 4;
                }

                score = score + groupScore;
            });

            return score;
        }

        soloScore = scoreSoloParks(parkGroups.solo);
        groupScore = scoreGroupParks(parkGroups.groups);
        score = soloScore + groupScore;

        return {
            score: score,
            groups: parkGroups.groups
        }
    }

    function totalScoreOffices(city){
        var score = 0;
        var count = city.score.numOffices;
      
        function addIncompleteGroupScore(group){
            switch (group){
                case 0:
                    break;
                case 1:
                    score = score + 1;
                    break;
                case 2:
                    score = score + 3;
                    break;
                case 3:
                    score = score + 6;
                    break;
                case 4:
                    score = score + 10;
                    break;
                case 5:
                    score = score + 15;
                    break;
                case 6:
                    score = score + 21;
                    break;
                default:
                    break;
            }
        }

        if(count > 6){
            score = 21 * Math.floor(count / 6);
            addIncompleteGroupScore(count % 6);
        } else {
            addIncompleteGroupScore(count);
        }
    
        score = Number(score + city.score.officesNextToTaverns);

        return score;
    }

    function totalScoreHouses(city){
        var score = 0;
        var count = city.score.numHouses;
                
        score = score + city.score.housesNextToFactories;
        score = score + ((city.score.numHouses - city.score.housesNextToFactories) * city.score.nonHouseTypes);

        return score;
    }

    function totalScoreShops(city) {
        var score = 0;
        var shops = city.tiles.filter(obj => obj["type"] === "shop");
        var finalGroups = [];
        var finalSolos = [];
        var snapshot = {
            shops: shops,
            soloShops: [],
            horizontalGroups: [],
            verticalGroups: [],
            largestGroup: [],
        };
        var shouldLoop = true;

        function removeCountedShopsFromSnapshot() {
            if (snapshot.largestGroup.length < 1) {
                return;
            }

            for (let i = snapshot.shops.length - 1; i >= 0; i--) {
                if (snapshot.largestGroup.indexOf(snapshot.shops[i]) !== -1) {
                    snapshot.shops.splice(i, 1);
                }
            }
        }

        function updateFinalGroups() {
            if (snapshot.largestGroup.length > 0) {
                finalGroups.push(snapshot.largestGroup);
            }
        }

        function updateSnapshotLargestGroup() {
            function compare(b, a) {
                return a.length - b.length;
            }

            function hasHorizontalGroups() {
                return snapshot.horizontalGroups.length > 0 ? true : false;
            }

            function hasVerticalGroups() {
                return snapshot.verticalGroups.length > 0 ? true : false;
            }

            function sortHorizontalByLengthHighToLow() {
                snapshot.horizontalGroups.sort(compare);
            }

            function sortVerticalByLengthHighToLow() {
                snapshot.verticalGroups.sort(compare);
            }

            function getLongestHorizontalGroup() {
                sortHorizontalByLengthHighToLow();
                return snapshot.horizontalGroups[0];
            }

            function getLongestVerticalGroup() {
                sortVerticalByLengthHighToLow();
                return snapshot.verticalGroups[0];
            }

            function getLargestShopGroup() {
                if (!hasHorizontalGroups() && !hasVerticalGroups()) {
                    shouldLoop = false;

                    return [];
                }
    
                if (!hasHorizontalGroups()) {
                    return getLongestVerticalGroup();
                }
    
                if (!hasVerticalGroups()) {
                    return getLongestHorizontalGroup();
                }
    
                if (hasHorizontalGroups() && hasVerticalGroups()) {
                    sortHorizontalByLengthHighToLow();
                    sortVerticalByLengthHighToLow();
    
                    var arr = [getLongestHorizontalGroup(), getLongestVerticalGroup()];
                    arr.sort(compare);
    
                    return arr[0];
                }
            }

            snapshot.largestGroup = getLargestShopGroup();
        }

        function updateSnapshotGroups() {
            function getSoloShops() {
                const arr = [];

                for (let i = 0; i < snapshot.shops.length; i++) {
                    const adjacentTiles = utility.getAdjacentTiles(city.tiles, snapshot.shops[i], false);
                    const adjacentShops = adjacentTiles.filter(obj => obj.type === 'shop');
    
                    if (adjacentShops.length === 0) {
                        arr.push(snapshot.shops[i]);
                    }
                }

                return arr;
            }

            function getHorizontalShops() {
                const arr = [];
                const shopsThatTouchAShopHorizontally = [];

                function getShopsThatTouchAShopHorizontally() {
                    for (let i = 0; i < snapshot.shops.length; i++) {
                        let doesTouch = false;

                        const eastAdjacentTile = utility.getAdjacentTiles(city.tiles, snapshot.shops[i], false, 'e');
                        const westAdjacentTile = utility.getAdjacentTiles(city.tiles, snapshot.shops[i], false, 'w');

                        if (eastAdjacentTile) {
                            if (
                                eastAdjacentTile.type === 'shop' &&
                                snapshot.shops.indexOf(eastAdjacentTile) !== -1
                            ) {
                                doesTouch = true;
                            }
                        }
        
                        if (westAdjacentTile) {
                            if (
                                westAdjacentTile.type === 'shop' &&
                                snapshot.shops.indexOf(westAdjacentTile) !== -1
                            ) {
                                doesTouch = true;
                            }
                        }
                    
                        if (doesTouch) {
                            shopsThatTouchAShopHorizontally.push(snapshot.shops[i]);
                        }
                    }
                }

                function sortShopsIntoGroups() {                   
                    for (let i = 0; i < 4; i++) {
                        const group = shopsThatTouchAShopHorizontally.filter(obj => obj.y === i);

                        if (group.length > 1) {
                            arr.push(group);
                        }
                    }
                }

                getShopsThatTouchAShopHorizontally();
                sortShopsIntoGroups();

                return arr;
            }
            
            function getVerticalShops() {
                const arr = [];
                const shopsThatTouchAShopVertically = [];

                function getShopsThatTouchAShopVertically() {
                    for (let i = 0; i < snapshot.shops.length; i++) {
                        let doesTouch = false;

                        const northAdjacentTile = utility.getAdjacentTiles(city.tiles, snapshot.shops[i], false, 'n');
                        const southAdjacentTile = utility.getAdjacentTiles(city.tiles, snapshot.shops[i], false, 's');

                        if (northAdjacentTile) {
                            if (
                                northAdjacentTile.type === 'shop' &&
                                snapshot.shops.indexOf(northAdjacentTile) !== -1
                            ) {
                                doesTouch = true;
                            }
                        }
        
                        if (southAdjacentTile) {
                            if (
                                southAdjacentTile.type === 'shop' &&
                                snapshot.shops.indexOf(southAdjacentTile) !== -1
                            ) {
                                doesTouch = true;
                            }
                        }
                    
                        if (doesTouch) {
                            shopsThatTouchAShopVertically.push(snapshot.shops[i]);
                        }
                    }
                }

                function sortShopsIntoGroups() {
                    for (let i = 0; i < 4; i++) {
                        const group = shopsThatTouchAShopVertically.filter(obj => obj.x === i);

                        if (group.length > 1) {
                            arr.push(group);
                        }
                    }
                }

                getShopsThatTouchAShopVertically();
                sortShopsIntoGroups();

                return arr;
            }

            var newSnapshot = {
                soloShops: getSoloShops(),
                horizontalGroups: getHorizontalShops(),
                verticalGroups: getVerticalShops(),
            };

            for (var key in newSnapshot) {
                if (newSnapshot.hasOwnProperty(key)) {
                    snapshot[key] = newSnapshot[key];
                }
            }
        }

        do {
            updateSnapshotGroups();
            updateSnapshotLargestGroup();
            updateFinalGroups();
            removeCountedShopsFromSnapshot();
        } while (shouldLoop);

        finalSolos = snapshot.shops;

        function scoreShopGroups() {
            var score = 0;

            for (let i = 0; i < finalGroups.length; i++) {
                switch (finalGroups[i].length) {
                    case 2:
                        score += 5;
                        break;
                    case 3:
                        score += 10;
                        break;
                    case 4:
                        score += 16;
                        break;
                    default:
                        break;
                }
            }

            return score;
        }

        function scoreSoloShops() {
            var score = finalSolos.length * 2;

            return score;
        }

        score += scoreShopGroups();
        score += scoreSoloShops();

        return {
            score: score,
            groups: finalGroups,
        }
    }

    function sortCitiesByFactoryCount() {
        var leaderBoard = {};

        cities.map(city => {
            const score = String(city["score"]["numFactories"]);

            if (!leaderBoard.hasOwnProperty(score)) {
                leaderBoard[score] = [];
            }

            leaderBoard[score].push(city.token);
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
        });
    }

    function totalScoreFactories(city) {
        var score = 0;
        var multiplier = city.score.factoryMultiplier;
        var factories = city.score.numFactories;

        score = multiplier * factories;

        return {
            score: score,
        }
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
            city["score"]["totalScoreTaverns"] = 0;
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
        });
    }

    setCounts();
    sortCitiesByFactoryCount();
    setTotals();
    setTotal();

    console.log(cities);
};

export default calculateScore;
