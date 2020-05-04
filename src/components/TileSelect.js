import React from 'react';
import Tile from './Tile';

function TileSelect(props){

	function renderTiles(tiles){
		var tileListItems = tiles.map((tile, index)=>{
			return <Tile chooseTile={props.chooseTile} tileToken={tile} key={index} />
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
					<button className='close-modal' type='button'>Close</button>
					<header>
						<h1>
							Choose Tile
						</h1>
					</header>
					{renderTiles(props.tiles)}
				</div>
			</div>
		</div>
	);
}

export default TileSelect;
