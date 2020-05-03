import React from 'react';
import { Link } from "react-router-dom";
 
import CityGridSquare from "./CityGridSquare";
import TileSelect from "./TileSelect";

function City(props) {
	var urlParams = new URLSearchParams(window.location.search);
	var token = urlParams.get('token');
	var game = urlParams.get('game');
	var cityData = (props.cities.filter(obj => obj["token"] === token))[0];
	var gridSize = game === "b2c" ? "four-by-four" : "five-by-five";
	
	function drawCityGrid(tiles){
		var grid = tiles.map((tile, index) => {
			return <CityGridSquare type={tile.type} typeSpecial={tile.typeSpecial} showSelectTileModal={props.showSelectTileModal} number={index} city={token} key={index} />
		});

		return (
			<ol className={`city-grid ${gridSize}`}>
				{grid}
			</ol>
		);
	}

	function renderGroups(arr){
		var groups = arr.map((group, index) => {
			return (
				<p key={`${group}-${index}`}>
					{`Group of ${group.length}`}
				</p>
			);
		});

		return (
			<React.Fragment>
				{groups}
			</React.Fragment>
		);
	}

	function drawScores(score, game){
		return (
			<div>
				<strong>City Total: {score.totalScore}</strong>
				<table className="city-score-table">
					<thead>
						<tr>
							<th>Tile</th>
							<th>Count</th>
							<th>Bonus/Modifier</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<p>Factory</p>
							</td>
							<td>
								<p>{score.numFactories}</p>
							</td>
							<td>
								<p>{score.factoryMultiplier }</p>
							</td>
							<td>
								<p>{score.totalScoreFactories}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Office</p>
							</td>
							<td>
								<p>{score.numOffices}</p>
							</td>
							<td>
								<p>{score.officesNextToTaverns > 0 ? `Offices by Taverns: ${score.officesNextToTaverns}` : ""}</p>
							</td>
							<td>
								<p>{score.totalScoreOffices}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>House</p>
							</td>
							<td>
								<p>{score.numHouses}</p>
							</td>
							<td>
								<p>{score.nonHouseTypes > 0 ? `Non-House Types: ${score.nonHouseTypes}` : ""}</p>
								<p>{score.housesNextToFactories > 0 ? `Houses next to Factory: ${score.housesNextToFactories}` : ""}</p>
							</td>
							<td>
								<p>{score.totalScoreHouses}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Park</p>
							</td>
							<td>
								<p>{score.numParks}</p>
							</td>
							<td>
								{score.parkGroups.length > 0 ? renderGroups(score.parkGroups) : "" }
							</td>
							<td>
								<p>{score.totalScoreParks}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Shop</p>
							</td>
							<td>
								<p>{score.numShops}</p>
							</td>
							<td>
								{score.shopGroups.length > 0 ? renderGroups(score.shopGroups) : "" }
							</td>
							<td>
								<p>{score.totalScoreShops}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Tavern</p>
							</td>
							<td>
								<p>{score.numTaverns}</p>
							</td>
							<td>
								<p>{score.uniqueTaverns > 0 ? `Taverns Types: ${score.uniqueTaverns}` : ""}</p>
							</td>
							<td>
								<p>{score.totalScoreTaverns}</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div>
			<header>
				<Link to="/between-two-cities" className="link-back">
					Back
				</Link>
				<h1>
					{cityData.name}
				</h1>
			</header>
			
			{drawCityGrid(cityData.tiles)}

			{drawScores(cityData.score)}

			{props.isSelectTileModalVisible === false ? null : 
				<TileSelect tavernTypes={props.tavernTypes} chooseTile={props.chooseTile} tiles={props.tiles} />
			}
		</div>
	);
}

export default City;
