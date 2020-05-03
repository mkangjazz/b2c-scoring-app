import React from 'react';
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<header>
				<h1>
					Choose Version
				</h1>
			</header>
			<nav>
				<ul className="list-panel">
					<li>
						<Link to="/between-two-cities/">
							<img className="image-game-cover" alt="Original Game Art" src="img/original.jpg" />
							<h2>Original</h2>
						</Link>
					</li>
					<li>
						<Link to="/capitals/">
							<img className="image-game-cover" alt="Capitals Expansion Game Art" src="/img/capitals.jpg" />
							<h2>Capitals</h2>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Home;
