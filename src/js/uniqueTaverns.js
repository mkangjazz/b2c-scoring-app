function uniqueTaverns(tiles){
  var tavernTypesFound = [];

  for (let i = 0; i < tiles.length; i++) {
      if( !(tavernTypesFound.includes(tiles[i]["typeSpecial"])) && (tiles[i]["type"] === 'tavern') ){
          tavernTypesFound.push(tiles[i]["typeSpecial"]);
      }
  }

  return (tavernTypesFound.filter(x => x).length);
}

export default uniqueTaverns;
