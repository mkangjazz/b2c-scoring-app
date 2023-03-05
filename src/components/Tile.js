import React from 'react';
import utility from '../js/utility';

function Tile(props){
	return (
		<li>
			<button
				onClick={(e) => props.chooseTile(e)}
				data-tile-type-special={utility.getTypeSpecial(props.tileToken)}
				data-tile-token={utility.specificToGenericToken(props.tileToken)}
				type="button"
			>
				<img 
					alt={`${props.tileToken} icon`} 
					className="image-tile-icon" 
					src={utility.prependWithPublicUrl(`./img/tile-${props.tileToken}.gif`)}
				/>
				{utility.getNameFromToken(props.tileToken)}
			</button>
		</li>
	);
}

export default Tile;
