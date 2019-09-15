import React from 'react';
import { Link } from "react-router-dom";
import original from '../img/original.jpg';
import capitals from '../img/capitals.jpg';

function Home() {
	return (
		<div>
			<header>
				<h1>
					Choose Game
				</h1>
			</header>
			<nav className="nav-game-selection">
				<Link to="/between-two-cities/">
					<img alt="Original" src={original} />
				</Link>
				<Link to="/capitals/">
					<img alt="Capitals" src={capitals} />
				</Link>
			</nav>
		</div>
	);
}

export default Home;
