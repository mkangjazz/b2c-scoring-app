import React from 'react';

function BetweenTwoCities(props){
	return (
		<div>
			<h1 className='game-title text-center'>
        		Cities
			</h1>
			<ul className="list-panel list-cities">
				{props.renderCitySummaries(props.cities)}
			</ul>
		</div>
	);
}

export default BetweenTwoCities;
