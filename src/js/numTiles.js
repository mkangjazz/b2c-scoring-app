import utility from './utility';

function numTiles(tiles, tileType){
  var genericType = utility.specificToGenericToken(tileType);
  var filteredArray = tiles.filter(obj => obj["type"] === genericType);

  return (filteredArray.length);
}

export default numTiles;