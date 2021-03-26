import React from 'react';
import { Link } from "react-router-dom";

function BetweenTwoCities(props){
	return (
		<div>
			<Link to="/" className="link-back">
				Back
			</Link>
			<h1 className='game-title'>
       {/* <img 
          alt=""
          src="/img/original.jpg" /> */}
        Original
			</h1>
			<ul className="list-panel list-cities">
				{props.renderCitySummaries(props.cities)}
			</ul>
		</div>
	);
}

export default BetweenTwoCities;
