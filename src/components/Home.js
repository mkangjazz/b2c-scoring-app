import React from 'react';
import { Link } from "react-router-dom";

function Home(props) {
	return (
		<div className='app-login'>
      <h1 className='app-title text-center'>
        B2C Scoring App
      </h1>
      <ul className="list-panel">
        <li>
          <Link to="/original">
            <img 
              alt="" 
              className="image-game-cover" 
              src="/img/original.jpg" />
            <h2>Original</h2>
          </Link>
        </li>
        <li>
          <Link to="/capitals">
            <img 
              alt="" 
              className="image-game-cover" 
              src="/img/capitals.jpg" />
            <h2>Capitals</h2>
          </Link>
        </li>
      </ul>
			<footer>
				<p>
					<small>
            Between Two Cities<sup>&reg;</sup> is a registered trademark of <a href="https://stonemaiergames.com">Stonemaier Games,</a> and is not affiliated with this app or its creator.
            <br />
  					B2C Scoring App &copy;<span id="date-field">{`${new Date().getFullYear()}`}</span>&nbsp; Mike Kang
          </small>
				</p>
			</footer>
		</div>
	);
}

export default Home;
