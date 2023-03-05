import React from 'react';
import { Link } from "react-router-dom";
import utility from '../js/utility';

function CitySummary(props){
	return (
		<li>
			<Link to={{pathname: "/city", search: `?token=${props.token}`}}>
				<img 
					alt={`${props.token} icon`} 
					className="image-city-token"
					src={utility.prependWithPublicUrl(`/img/token-${props.token}.gif`)}
				/>
				<h3>
					{props.name}
				</h3>
				<span className="total-score">{props.score.totalScore > 0 ? props.score.totalScore : 0}</span>
			</Link>
		</li>
	);
}

export default CitySummary;
