import utility from './utility';

function housesNextToFactories(tiles){
  var houseTiles = tiles.filter(obj => obj["type"] === 'house');
  var count = 0;
  
  for(let i = 0; i < houseTiles.length; i++) {
      
      var adjacentTiles = utility.getAdjacentTiles(tiles, houseTiles[i], true);
      
      if(adjacentTiles.length > 0){
          var adjacentFactories = adjacentTiles.filter(obj => obj["type"] === 'factory');
          
          if(adjacentFactories.length > 0){
              count++;
          }
      }
  }

  return count;
}

export default housesNextToFactories;
