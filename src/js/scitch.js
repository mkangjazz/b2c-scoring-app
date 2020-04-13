        
        var shopsThatTouchAShop = [];
        var shopGroups = [];
        var shopGroupsHorizontal = [];
        var shopGroupsVertical = [];
        var groupedShopGroups = [];
        var groupedShopGroupsHorizontal = [];
        var groupedShopGroupsVertical = [];
        var soloShops = [];


        function groupAdjacentShops(index, arr){
            var shopGroup = [];
            var shopGroupHorizontal = [];
            var shopGroupVertical = [];
            var adjacentTiles = utility.getAdjacentTiles(arr, arr[index], false),
                adjacentShops = adjacentTiles.filter(obj => obj["type"] === 'shop'),
                adjacentShopsHorizontal = adjacentShops.filter(obj => obj["y"] === arr[index]["y"]),
                adjacentShopsVertical = adjacentShops.filter(obj => obj["x"] === arr[index]["x"]);

            if(adjacentShops.length > 0){
                shopsThatTouchAShop.push(arr[index].number);

                if(adjacentShopsHorizontal.length > 0){
                    shopGroupHorizontal.push(arr[index].number);
                    adjacentShopsHorizontal.map(obj => shopGroupHorizontal.push(obj.number));
                    shopGroupsHorizontal.push(shopGroupHorizontal);            
                }
                
                if(adjacentShopsVertical.length > 0){
                    shopGroupVertical.push(arr[index].number);
                    adjacentShopsVertical.map(obj => shopGroupVertical.push(obj.number));
                    shopGroupsVertical.push(shopGroupVertical);
                }

                if(shopGroup.length > 0){
                    shopGroups.push(shopGroup);
                }
            } else {
                soloShops.push(shops[index].number);
            }

            return;
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

        function removeGroupedShops(arrayA, arrayB){
            var filteredArray = [];
            var flatGrouping = arrayB.reduce(function(accumulator, currentValue) {
                return accumulator.concat(currentValue);
            }, []);

            arrayA.forEach((subArray) => {
                if(!flatGrouping.includes(subArray[0])){
                    filteredArray.push(subArray);
                }
            });

            return filteredArray;
        }

        for(var i=0; i < shops.length; i++){
            groupAdjacentShops(i, shops);
        }

        function cleanUpGroups(){
            console.log("clean up shop groups");

            while(shopGroupsHorizontal.length > 0){
                groupedShopGroupsHorizontal.push(groupArray(shopGroupsHorizontal));
                shopGroupsHorizontal = removeGroupedShops(shopGroupsHorizontal, groupedShopGroupsHorizontal);
            }
    
            while(shopGroupsVertical.length > 0){
                groupedShopGroupsVertical.push(groupArray(shopGroupsVertical));
                shopGroupsVertical = removeGroupedShops(shopGroupsVertical, groupedShopGroupsVertical);
            }
        }

        function reGroup(){
            // optimization theory
                // the fewer the groups, the higher the score
                // because that implies each group has a higher number of shops
            // starting from a list of shopsTouchingShops
            // figure out the available groupings
            // vertically and horizontally

            cleanUpGroups();

            // console.log(shopGroupsHorizontal, shopGroupsVertical);
            console.log(groupedShopGroupsHorizontal, groupedShopGroupsVertical);
        }