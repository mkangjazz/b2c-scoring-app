var utility = (function(){
  function prependWithPublicUrl(src){
    return process.env.PUBLIC_URL + src;
  }

	function convertNumberTo5x5Coordinates(number){
		var o = {
			x: number%5
		};

		if(number < 5){
			o["y"] = 0;
		}

		if(number >= 5 && number < 10){
			o["y"] = 1;
		}

		if(number >= 10 && number < 15){
			o["y"] = 2;
		}

		if(number >= 15 && number < 20){
			o["y"] = 3;
		}

		if(number >= 20 && number < 25){
			o["y"] = 4;
		}

		return o;
	}

	function convertNumberTo4x4Coordinates(number){
		var o = {
			x: number%4
		};

		if(number < 4){
			o["y"] = 0;
		}

		if(number >= 4 && number < 8){
			o["y"] = 1;
		}

		if(number >= 8 && number < 12){
			o["y"] = 2;
		}

		if(number >= 12 && number < 16){
			o["y"] = 3;
		}

		return o;
	}

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

  function getAdjacentTiles(tiles, tile, isOmniDirectional, direction){
    var adjacentTiles = [];
    var adjacentTileObj = {};

    adjacentTileObj.n = tiles.find(
      obj => (obj["x"] === tile["x"] && obj["y"] === tile["y"] - 1)
    );

    adjacentTileObj.e = tiles.find(
      obj => (obj["x"] === tile["x"]+1 && obj["y"] === tile["y"])
    );

    adjacentTileObj.s = tiles.find(
      obj => (obj["x"] === tile["x"] && obj["y"] === tile["y"] + 1)
    );

    adjacentTileObj.w = tiles.find(
      obj => (obj["x"] === tile["x"] - 1 && obj["y"] === tile["y"])
    );

    adjacentTiles.push(adjacentTileObj.n);
    adjacentTiles.push(adjacentTileObj.e);
    adjacentTiles.push(adjacentTileObj.s);
    adjacentTiles.push(adjacentTileObj.w);

    if(isOmniDirectional){
      adjacentTileObj.ne = tiles.find(
        obj => (obj["x"] === tile["x"] + 1 && obj["y"] === tile["y"] - 1)
      );
  
      adjacentTileObj.nw = tiles.find(
        obj => (obj["x"] === tile["x"] - 1 && obj["y"] === tile["y"] - 1)
      );
  
      adjacentTileObj.se = tiles.find(
        obj => (obj["x"] === tile["x"] + 1 && obj["y"] === tile["y"] + 1)
      );
  
      adjacentTileObj.sw = tiles.find(
        obj => (obj["x"] === tile["x"] - 1 && obj["y"] === tile["y"] + 1)
      );

      adjacentTiles.push(adjacentTileObj.ne);
      adjacentTiles.push(adjacentTileObj.nw);
      adjacentTiles.push(adjacentTileObj.se);
      adjacentTiles.push(adjacentTileObj.sw);
    }

    if (direction) {
      return adjacentTileObj[direction];
    }
    
    adjacentTiles = adjacentTiles.filter(Boolean);

    return adjacentTiles;
  }

  return {
    prependWithPublicUrl,
    convertNumberTo5x5Coordinates,
    convertNumberTo4x4Coordinates,
    getAdjacentTiles: getAdjacentTiles,
    getNameFromToken: getNameFromToken,
    getTypeSpecial: getTypeSpecial,
    specificToGenericToken: specificToGenericToken,
  }
}());

export default utility;
