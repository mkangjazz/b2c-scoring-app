import React from 'react';
import { Link } from "react-router-dom";

function BetweenTwoCities(props){
	
	return (
		<div>
			<header>
				<Link to="/" className="link-back">
					Back
				</Link>
				<h1>
					Between Two Cities
				</h1>
			</header>
			<h3>
				Cities
			</h3>
			<ul className="list-panel">
				{props.renderCitySummaries(props.cities)}
			</ul>
		</div>
	);
}

export default BetweenTwoCities;
