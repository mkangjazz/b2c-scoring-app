import utility from './utility';

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
        
        for(let i = 0; i < parks.length; i++) {
            var parkGroup = [];
            var adjacentTiles = utility.getAdjacentTiles(tiles, parks[i], true);
            var adjacentParks = adjacentTiles.filter(obj => obj["type"] === 'park');

            if(adjacentParks.length > 0){
                parkGroup.push(parks[i].number);

                for (let j = 0; j < adjacentParks.length; j++) {
                    parkGroup.push(adjacentParks[j].number);
                }

                if(parkGroup.length > 0){
                    parkGroups.push(parkGroup);
                }                        
            } else {
                soloParks.push(parks[i].number);
            }
        }

        function groupArray(arr){
            var grouping;

            function reducer(accumulator, currentValue){
                if(accumulator.some(v => currentValue.indexOf(v) >= 0)){
                    for(let i = 0; i < currentValue.length; i++){
                        if(!(accumulator.includes(currentValue[i]))){
                            accumulator.push(currentValue[i]);
                        }
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

export default totalScoreParks;