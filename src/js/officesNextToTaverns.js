import utility from './utility';

function officesNextToTaverns(tiles){
    var offices = tiles.filter(obj => obj["type"] === 'office');
    var count = [];

    for(let i = 0; i < offices.length; i++) {
        var adjacentTiles = utility.getAdjacentTiles(tiles, offices[i], false);
        
        if(adjacentTiles.length > 0){
            var adjacentFactories = adjacentTiles.filter(obj => obj["type"] === 'tavern');
            
            if(adjacentFactories.length > 0){
                count++;
            }
        }
    }

    return count;
}

export default officesNextToTaverns;
