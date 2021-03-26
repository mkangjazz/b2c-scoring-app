import React from 'react';
import { Link } from "react-router-dom";

function Home(props) {
	return (
		<div className='app-login'>
      <h1 className='logo'>
        B2C Scoring App
      </h1>
      <ul className="list-panel">
        <li>
          <Link to="/original">
            <img 
              alt="" 
              className="image-city-token" 
              src="/img/original.jpg" />
            <h3>Original</h3>
          </Link>
        </li>
        <li>
          <Link to="/capitals">
            <img 
              alt="" 
              className="image-city-token" 
              src="/img/capitals.jpg" />
            <h3>Capitals</h3>
          </Link>
        </li>
      </ul>
			<footer>
				<p>
					<small>Between Two Cities<sup>&reg;</sup> is a registered trademark of <a href="https://stonemaiergames.com">Stonemaier Games,</a> and is not affiliated with this app or its creator.</small>
				</p>
				<p>
					<small>
						B2C Scoring App &copy;<span id="date-field">{`${new Date().getFullYear()}`}</span>&nbsp;
						<a href='linkedin.com/in/michael-kang-5150014a' title='LinkedIn'>Mike Kang</a>
					</small>
				</p>
			</footer>
		</div>
	);
}

export default Home;
