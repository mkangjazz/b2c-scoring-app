import React from 'react';
import { Link } from "react-router-dom";

function Home(props) {
	return (
		<div className='app-login'>
			<form>
				<div>
					<h1>
						Between 2 Cities Scoring App
					</h1>
					<div className='input-group'>
						<select
							defaultValue={props.version}
							onChange={props.handleVersionSelection}
						>
							<option value=''>Choose Version</option>
							<option value='original'>Original</option>
							<option value='capitals'>Capitals</option>
						</select>
						<input
							disabled={props.version === '' ? 'disabled' : ''}
							type='submit'
							value='Go'
							/>
					</div>
					<small>Score cities quicky, easily, and accurately</small>
				</div>
			</form>
			<footer>
				<p>
					<small>Between Two Cities<sup>&reg;</sup> is a registered trademark of <a href="https://stonemaiergames.com">Stonemaier Games,</a> and is not affiliated with this app or its creator.</small>
				</p>
				<p>
					<small>
						Scoring App &copy;<span id="date-field">{`${new Date().getFullYear()}`}</span>&nbsp;
						<a href='linkedin.com/in/michael-kang-5150014a' title='LinkedIn'>Mike Kang</a>
					</small>
				</p>
			</footer>
			{/* <nav>
				<ul className="list-panel">
					<li>
						<Link to="/original/">
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
			</nav> */}
		</div>
	);
}

export default Home;
