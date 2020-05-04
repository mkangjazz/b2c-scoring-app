function nonHouseTypes(tiles){
  var typesFound = [];

  for (let i = 0; i < tiles.length; i++) {    
      if( !(typesFound.includes(tiles[i]["type"])) && tiles[i]["type"] !== 'house' ){
          typesFound.push(tiles[i]["type"]);
      }
  }

  return typesFound.filter(x => x).length;
}

export default nonHouseTypes;
