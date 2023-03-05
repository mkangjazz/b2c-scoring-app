import React from 'react';
import Tile from './Tile';

function TileSelect(props){
	function renderTiles(tiles){
		var tileListItems = tiles.map((tile, index)=>{
			return <Tile chooseTile={props.chooseTile} tileToken={tile} key={`${tile}-${index}`} />
		});
		return (
			<ul className='list-panel list-tiles'>
				{tileListItems}
			</ul>
		);
	}

	return (
		<div className="modal-wrapper">
			<div className="modal">
				<div className="modal-content">
					<button onClick={(e) => props.hideSelectTileModal(e)} className='close-modal' type='button'>Close</button>
          <h1 className='modal-title'>
							Choose Tile
          </h1>
					{renderTiles(props.tiles)}
				</div>
			</div>
		</div>
	);
}

export default TileSelect;
