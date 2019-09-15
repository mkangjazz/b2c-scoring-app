import React from 'react';
import utility from '../js/utility';

function CityGridSquare(props) {
	return (
		<li>
			<button onClick={(e) => props.showSelectTileModal(e)} type="button" data-tile-type-special={props.typeSpecial} data-tile-token={props.type} data-number={props.number} data-city={props.city} >
				{props.type ? utility.getNameFromToken(props.type) : "None Specified"} {props.typeSpecial ? `${utility.getNameFromToken(props.typeSpecial)}` : "" }
			</button>
		</li>
	);
}

export default CityGridSquare;

