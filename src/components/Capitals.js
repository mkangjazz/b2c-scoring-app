import React from 'react';
import { Link } from "react-router-dom";

function Capitals() {
	return (
		<div>
			<header>
				<Link to="/" className="link-back">
					Back
				</Link>
				<h1>
					Capitals
				</h1>
			</header>
		</div>
	);
  }

  export default Capitals;
