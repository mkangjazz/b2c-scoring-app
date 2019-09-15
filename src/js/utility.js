var utility = (function(){

  function getTypeSpecial(token){
    if(token){
      return token.split("-")[1];
    }
  }

  function specificToGenericToken(token){
    if(token){
      return token.split("-")[0];
    }
  }

  function getNameFromToken(token){
    var name;

    if(token){
      name = token.replace(/-/g, " ");
    
      name = name.replace(/(st)|(mt)/g, function(match){
        return match + ".";
      });
    
      name = name.split(" ").map((str)=>{
        return (str.charAt(0).toUpperCase() + str.slice(1));
      }).join(" ");
    
      return name;
    }
  }

  function getAdjacentTiles(tiles, tile, isOmniDirectional){
    var adjacentTiles = [];

    var n = tiles.find(
      obj => (obj["x"] === tile["x"] && obj["y"] === tile["y"] - 1)
    );

    var e = tiles.find(
      obj => (obj["x"] === tile["x"]+1 && obj["y"] === tile["y"])
    );

    var s = tiles.find(
      obj => (obj["x"] === tile["x"] && obj["y"] === tile["y"] + 1)
    );

    var w = tiles.find(
      obj => (obj["x"] === tile["x"] - 1 && obj["y"] === tile["y"])
    );

    adjacentTiles.push(n);
    adjacentTiles.push(e);
    adjacentTiles.push(s);
    adjacentTiles.push(w);

    if(isOmniDirectional){
      var ne = tiles.find(
        obj => (obj["x"] === tile["x"] + 1 && obj["y"] === tile["y"] - 1)
      );
  
      var nw = tiles.find(
        obj => (obj["x"] === tile["x"] - 1 && obj["y"] === tile["y"] - 1)
      );
  
      var se = tiles.find(
        obj => (obj["x"] === tile["x"] + 1 && obj["y"] === tile["y"] + 1)
      );
  
      var sw = tiles.find(
        obj => (obj["x"] === tile["x"] - 1 && obj["y"] === tile["y"] + 1)
      );

      adjacentTiles.push(ne);
      adjacentTiles.push(nw);
      adjacentTiles.push(se);
      adjacentTiles.push(sw);
    }
    
    adjacentTiles = adjacentTiles.filter(Boolean);

    return adjacentTiles;
  }

  return {
    getAdjacentTiles: getAdjacentTiles,
    getNameFromToken: getNameFromToken,
    getTypeSpecial: getTypeSpecial,
    specificToGenericToken: specificToGenericToken,
  }
}());


export default utility;