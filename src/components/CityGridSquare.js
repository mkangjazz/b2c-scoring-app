import React from 'react';
import utility from '../js/utility';

function CityGridSquare(props) {
	let imgSrc = '';
	
	if (props.type) {
		imgSrc += props.type;
	}

	if (props.typeSpecial) {
		imgSrc += `-${props.typeSpecial}`;
	}

	return (
		<li>
			<button 
				className={props.type}
				onClick={(e) => props.showSelectTileModal(e)}
				type="button" 
				data-tile-type-special={props.typeSpecial} 
				data-tile-token={props.type}
				data-number={props.number} data-city={props.city}
			>
				{imgSrc !== '' ? <img alt={`icon`} className="image-tile-icon" src={`/img/icon-${imgSrc}-white.png`} /> : ''}

				{props.type ? <span>{utility.getNameFromToken(props.type)}</span> : "—"} {props.typeSpecial ? `${utility.getNameFromToken(props.typeSpecial)}` : "" }
			</button>
		</li>
	);
}

export default CityGridSquare;
