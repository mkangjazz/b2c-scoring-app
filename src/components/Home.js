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
				<ul className="list-panel">
					<li>
						<Link to="/between-two-cities/">
							<img alt="Original" src={original} />
							<h2>Original</h2>
						</Link>
					</li>
					<li>
						<Link to="/capitals/">
							<img alt="Capitals" src={capitals} />
							<h2>Capitals</h2>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Home;
