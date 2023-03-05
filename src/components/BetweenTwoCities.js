import React from 'react';

function BetweenTwoCities(props){
	return (
		<div>
			<h1 className='game-title text-center'>
        		{props.game.name}
			</h1>
			<ul className="list-panel list-cities">
				{props.renderCitySummaries(props.cities)}
			</ul>
		</div>
	);
}

export default BetweenTwoCities;
