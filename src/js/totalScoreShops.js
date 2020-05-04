import utility from './utility';

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

export default totalScoreShops;