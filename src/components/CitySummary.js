import React from 'react';
import { Link } from "react-router-dom";

function CitySummary(props){
	return (
		<li className={props.token}>
			<Link to={{pathname: "/city/", search: `?token=${props.token}&game=b2c`}}>
				<span className="score">{props.score.totalScore > 0 ? props.score.totalScore : 0}</span>
				<h3>{props.name}</h3>
			</Link>
		</li>
	);
}

export default CitySummary;
