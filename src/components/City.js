import React from 'react';
import { Link } from "react-router-dom";
 
import CityGridSquare from "./CityGridSquare";
import TileSelect from "./TileSelect";

function City(props) {
	var urlParams = new URLSearchParams(window.location.search);
	var token = urlParams.get('token');
	var game = urlParams.get('game');
	var cityData = (props.cities.filter(obj => obj["token"] === token))[0];
	var gridSize = game === "original" ? "four-by-four" : "five-by-five";
	
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

	function renderTavernIcons(groups) {
		const icons = groups.map((group, index) => 
			<div key={`group-${index}`}>
				{group.length === 4 ? '17 | ' : ''}
				{group.length === 3 ? '09 | ' : ''}
				{group.length === 2 ? '04 | ' : ''}
				{group.length === 1 ? '01 | ' : ''}

				{group.map((str,index) => (
					<img 
						alt={`${str} icon`}
						className="image-special-tavern-icon"
						key={`${str}-${index}`}
						src={`/img/icon-tavern-${str}.png`}
					/>
				))}
			</div>
		);

		return (
			<React.Fragment>
				{icons}
			</React.Fragment>
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
				<table className="city-score-table">
					<thead>
						<tr>
							<th>Tile</th>
							<th>#</th>
							<th>Modifiers</th>
							<th>Pts</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<img alt="Factory icon" className="image-tile-icon" src="/img/tile-factory.gif" />
								Factory
							</td>
							<td>
								{score.numFactories}
							</td>
							<td>
								{score.factoryMultiplier === 4 ? <img className='image-medal-icon' alt='Gold medal' src='/img/icon-gold.gif' /> : ''}
								{score.factoryMultiplier === 3 ? <img className='image-medal-icon' alt='Silver medal' src='/img/icon-silver.gif' /> : ''}
								{score.factoryMultiplier > 2 ? <span>x {score.factoryMultiplier} </span>: ''}
							</td>
							<td>
								{score.totalScoreFactories}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="Office icon" className="image-tile-icon" src="/img/tile-office.gif" />
								Office
							</td>
							<td>
								{score.numOffices}
							</td>
							<td>
								{score.officesNextToTaverns > 0 ? `Offices by Taverns: ${score.officesNextToTaverns}` : ""}
							</td>
							<td>
								{score.totalScoreOffices}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="House icon" className="image-tile-icon" src="/img/tile-house.gif" />
								House
							</td>
							<td>
								{score.numHouses}
							</td>
							<td>
								{score.nonHouseTypes > 0 ? `Non-Houses: ${score.nonHouseTypes}` : ""}
								{score.housesNextToFactories > 0 ? `Houses next to Factory: ${score.housesNextToFactories}` : ""}
							</td>
							<td>
								{score.totalScoreHouses}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="Park icon" className="image-tile-icon" src="/img/tile-park.gif" />
								Park
							</td>
							<td>
								{score.numParks}
							</td>
							<td>
								{score.parkGroups.length > 0 ? renderGroups(score.parkGroups) : "" }
							</td>
							<td>
								{score.totalScoreParks}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="Shop icon" className="image-tile-icon" src="/img/tile-shop.gif" />
								Shop
							</td>
							<td>
								{score.numShops}
							</td>
							<td>
								{score.shopGroups.length > 0 ? renderGroups(score.shopGroups) : "" }
							</td>
							<td>
								{score.totalScoreShops}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="Tavern icon" className="image-tile-icon" src="/img/tile-tavern-drink.gif" />
								Tavern
							</td>
							<td>
								{score.numTaverns}
							</td>
							<td>
								{renderTavernIcons(score.uniqueTaverns)}
							</td>
							<td>
								{score.totalScoreTaverns}
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
				<Link to="/original/" className="link-back">
					Back
				</Link>
				<h1>
					<img alt={`${cityData.token} icon`} className="image-city-token" src={`/img/token-${cityData.token}.gif`} />
					{cityData.name}: {cityData.score.totalScore} pts
				</h1>
			</header>
			
			{drawCityGrid(cityData.tiles)}

			{drawScores(cityData.score)}

			{props.isSelectTileModalVisible === false ? null : 
				<TileSelect hideSelectTileModal={props.hideSelectTileModal} tavernTypes={props.tavernTypes} chooseTile={props.chooseTile} tiles={props.tiles} />
			}
		</div>
	);
}

export default City;
