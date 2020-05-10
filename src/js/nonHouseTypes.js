function nonHouseTypes(tiles){
  var typesFound = [];

  for (let i = 0; i < tiles.length; i++) {
      if(
        typesFound.indexOf(tiles[i]["type"]) === -1 &&
        tiles[i]["type"] !== 'house' &&
        tiles[i]["type"] !== '' &&
        tiles[i]["type"] !== null &&
        tiles[i]["type"] !== 'undefined'
      ) {
        typesFound.push(tiles[i]["type"]);
      }
  }

  return typesFound;
}

export default nonHouseTypes;
