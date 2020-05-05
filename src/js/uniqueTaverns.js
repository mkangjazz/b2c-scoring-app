function uniqueTaverns(tiles){
  var tavernTypesFound = [];
  var groups = [];

  function makeTavernSet() {
    var arr = [];

    for (let i = tavernTypesFound.length - 1; i >= 0; i--) {
      if (arr.indexOf(tavernTypesFound[i]) === -1) {
        arr.push(tavernTypesFound[i]);
        tavernTypesFound.splice(i, 1);
      }
    }

    groups.push(arr);
  }

  function findTaverns() {
    for (let i = 0; i < tiles.length; i++) {
      if (
        (tiles[i]["type"] === 'tavern')
      ){
        tavernTypesFound.push(tiles[i]["typeSpecial"]);
      }
    }
  }

  findTaverns();

  makeTavernSet();

  do {
    makeTavernSet();
  } while (tavernTypesFound.length > 0);

  groups.map(group => group.sort());

  return groups;
}

export default uniqueTaverns;
