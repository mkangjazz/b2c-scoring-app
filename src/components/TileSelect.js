import React from 'react';
import Tile from './Tile';

function TileSelect(props){

	function renderTiles(tiles){
		var tileListItems = tiles.map((tile, index)=>{
			return <Tile chooseTile={props.chooseTile} tileToken={tile} key={index} />
		});

		return (
			<ul>
				{tileListItems}
			</ul>
		);
	}

	return (
		<div className="modal-wrapper">
			<div className="overlay"></div>
			<div className="modal">
				<header>
					<h1>
						Choose Tile
					</h1>
				</header>
				<h3>Base</h3>
				{renderTiles(props.tiles)}
				
				conditional render: 
				<h3>Civic</h3>
				{/* Tile selection modal or other interface with list...? */}
				{/* button onclick? */}
			</div>
		</div>
	);
}

export default TileSelect;
