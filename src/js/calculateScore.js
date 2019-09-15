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

    function totalScoreFactories(cities, city){
        // var count = getTileCount(city, 'factory');
        // var multiplier;

        // console.log(cities, city);

        // if(calculateTileLeaderStatus(city, 'factory') === 'first'){
        //     multiplier = 4;
        // } else if(calculateTileLeaderStatus(city, 'factory') === 'second'){
        //     multiplier = 3;
        // } else {
        //     multiplier = 2;
        // }

        // return count * multiplier;
        // return {
        //     score: score,
        //     bonus: bonus
        // }
    }

    function totalScoreParks(tiles){
        var score = 0,
            groupScore = 0,
            soloScore = 0;

        var info = makeParkGroups(tiles);

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

        soloScore = scoreSoloParks(info.solo);
        groupScore = scoreGroupParks(info.groups);
        score = soloScore + groupScore;

        return {
            score: score,
            groups: info.groups
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
    
        score = score + city.score.officesNextToTaverns;

        return score;
    }

    function totalScoreHouses(city){
        var score = 0;
        var count = city.score.numHouses;
                
        score = score + city.score.housesNextToFactories;
        score = score + ((city.score.numHouses - city.score.housesNextToFactories) * city.score.nonHouseTypes);

        return score;
    }

    function totalScoreShops(city){
        var score = 0;

        var shops = city.tiles.filter(obj => obj["type"] === "shop");
        var soloShops = [];
        var shopsThatTouchAShop = [];
        var shopGroups = [];
        
// for checking shop rows... should check all the way down or up the row/col
// given one spot, check surrounding for adjacent
// if one exists, continue down that row to gather all
// show all the options? choose the most optimal one?
// and then remove itself from the adjacentShops list for no double counting?

        for(var i=0; i < shops.length; i++){
            (function(index){
                var shopGroup = [];
                var adjacentTiles = utility.getAdjacentTiles(city.tiles, shops[index], false),
                    adjacentShops = adjacentTiles.filter(obj => obj["type"] === 'shop');

                if(adjacentShops.length > 0){
                    shopsThatTouchAShop.push(shops[index].number);
                } else {
                    soloShops.push(shops[index].number);
                }
            }(i));
        }

        // 2 / 5 / 10 / 16
        // shops score when connected in a straight line (row or column)
        // 5 points for two connected
        // 10 points for three connected in a straight line
        // 16 points for four connected shops in a straight line
        
        // if lines of shops cross (L or T), each tile can only be counted for one of the sets        
        // score each set of shops separately
        
        // get all connected stores (not omni, only row/col)
        //     figure out which scoring is optimal
        //         longest row up to 4 / 3 / 2
        //         before making any other rows/cols
                
        console.log(shopsThatTouchAShop, soloShops);

        function soloShopScore(num){
            var score = 0;

            score = num * 2;

            return score;
        }

        score += soloShopScore(soloShops.length);

        return score;
    }



    function setTotals(){
        cities.map(city => {
            city["score"]["factoryMultiplier"] = 0;
            city["score"]["parkGroups"] = totalScoreParks(city.tiles).groups;
            city["score"]["totalScoreParks"] = totalScoreParks(city.tiles).score;
            city["score"]["totalScoreOffices"] = totalScoreOffices(city);
            city["score"]["totalScoreHouses"] = totalScoreHouses(city);
            city["score"]["totalScoreFactories"] = totalScoreFactories(cities, city);
            city["score"]["totalScoreShops"] = totalScoreShops(city);
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
            city["score"]["totalScoreTaverns"]
        ];

        score = scores.reduce((a, b) => a + b, 0);

        return score;
    }

    function setTotal(){
        cities.map(city => {
            city["score"]["total"] = totalScore(city);
        });
    }
    
    setCounts();
    setTotals();
    setTotal();
};

export default calculateScore;
