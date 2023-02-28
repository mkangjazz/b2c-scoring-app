import React from 'react';
import { Link } from "react-router-dom";

import CityGridSquare from "./CityGridSquare";
import TileSelect from "./TileSelect";
import ScoringInstructions from "./ScoringInstructions";

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

	function renderNonHouseTypes(nonHouseTypes) {
		const icons = nonHouseTypes.map((type, index) =>
			<div key={`group-${index}`} className="css-icon-container noborder">
				<span className={`${type}`}></span>
			</div>
		);

		return (
			<table>
				<tbody>
					<tr>
						<td>
							{icons}
						</td>
						<td>
							{`x${nonHouseTypes.length}`}
						</td>
					</tr>
				</tbody>
			</table>
		);
	}

	function renderHouseFactoryAdjacencies(housesNextToFactories) {
		return (
			<table>
				<tbody>
					<tr>
						<td>
							<div className="css-icon-container">
								<span className='house'></span>
							</div>
							<div className="css-icon-container">
								<span className='factory'></span>
							</div>
							&nbsp;{`x ${housesNextToFactories}`}
						</td>
						<td>
							~1
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
	function renderOfficesByTaverns(offices) {
		return (
			<table>
				<tbody>
					<tr>
						<td>
							<div className="css-icon-container">
								<span className="office"></span>
							</div>
							<div className="css-icon-container">
								<span className="tavern"></span>
							</div>
							&nbsp;{`x ${offices}`}
						</td>
						<td>
							{`+${offices}`}
						</td>
					</tr>
				</tbody>
			</table>
		);
	}

	function renderParkGroups(groups) {
		const icons = groups.map((group, index) =>
			<tr key={`group-${index}`}>
				<td>
					<div className="css-icon-container">
						<span className="park"></span>
					</div>
					<div className="css-icon-container">
						<span className="park"></span>
					</div>
					&nbsp;{`... ${group.length}`}
				</td>
				<td>
					{group.length === 2 ? '+8' : ''}
					{group.length === 3 ? '+12' : ''}
					{group.length > 3 ? `+${String(12 + group.length - 3)}` : ''}
				</td>
			</tr>
		);

		return (
			<table>
				<tbody>
					{icons}
				</tbody>
			</table>
		);
	}

	function renderTavernIcons(groups) {
		const icons = groups.map((group, index) =>
			<tr key={`group-${index}`}>
				<td>
					{group.map((str,index) => (
						<img
							alt={`${str} icon`}
							className="image-special-tavern-icon"
							key={`${str}-${index}`}
							src={`/img/icon-tavern-${str}.png`}
						/>
					))}
				</td>
				<td>
					{group.length === 1 ? '+1' : ''}
					{group.length === 2 ? '+4' : ''}
					{group.length === 3 ? '+9' : ''}
					{group.length === 4 ? '+17' : ''}
				</td>
			</tr>
		);

		return (
			<table>
				<tbody>
					{icons}
				</tbody>
			</table>
		);
	}

	function renderShopGroups(arr){
		var groups = arr.map((group, index) => {
			return (
				<tr key={`${group}-${index}`}>
					<td>
						<div className="css-icon-container">
							<span className="shop"></span>
						</div>
						<div className="css-icon-container">
							<span className="shop"></span>
						</div>
						&nbsp;{`... ${group.length}`}
					</td>
					<td>
						{group.length === 2 ? '+5' : ''}
						{group.length === 3 ? '+10' : ''}
						{group.length === 4 ? '+16' : ''}
					</td>
				</tr>
			);
		});

		return (
			<table>
				<tbody>
					{groups}
				</tbody>
			</table>
		);
	}

	function drawScores(score, game){
		return (
			<div>
				<table className="city-score-table">
					<thead>
						<tr>
							<th className="city-score-table-number">#</th>
							<th>Tile</th>
							<th>Modifiers</th>
							<th className="city-score-table-number">Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
              <td className="city-score-table-number">
								{score.numFactories}
							</td>
							<td>
								<button
									className='city-score-legend'
									onClick={props.showScoringInstructionsModal('factory')}
									type='button'
								>
									<img alt="Factory icon" className="image-tile-icon" src="/img/tile-factory.gif" />
									<span>Factory</span>
								</button>
							</td>
							<td>
								{score.factoryMultiplier === 4 ? <img className='image-medal-icon' alt='Gold medal' src='/img/icon-gold.gif' /> : ''}
								{score.factoryMultiplier === 3 ? <img className='image-medal-icon' alt='Silver medal' src='/img/icon-silver.gif' /> : ''}
								{score.factoryMultiplier > 2 ? <span>x {score.factoryMultiplier} </span>: ''}
							</td>
							<td className="city-score-table-number">
								{score.totalScoreFactories}
							</td>
						</tr>
						<tr>
              <td className="city-score-table-number">
								{score.numOffices}
							</td>
							<td>
                <button
                  className='city-score-legend'
                  onClick={props.showScoringInstructionsModal('office')}
                  type='button'
                >
                  <img alt="Office icon" className="image-tile-icon" src="/img/tile-office.gif" />
                  <span>Office</span>
                </button>
							</td>
							<td>
								{score.officesNextToTaverns > 0 ? renderOfficesByTaverns(score.officesNextToTaverns) : ""}
							</td>
							<td className="city-score-table-number">
								{score.totalScoreOffices}
							</td>
						</tr>
						<tr>
              <td className="city-score-table-number">
								{score.numHouses}
							</td>
							<td>
                <button
                  className='city-score-legend'
                  onClick={props.showScoringInstructionsModal('house')}
                  type='button'
                >
                  <img alt="House icon" className="image-tile-icon" src="/img/tile-house.gif" />
                  <span>House</span>
                </button>
							</td>
							<td>
								{score.nonHouseTypes.length > 0 ? renderNonHouseTypes(score.nonHouseTypes) : ""}
								{score.housesNextToFactories > 0 ? renderHouseFactoryAdjacencies(score.housesNextToFactories) : ""}
							</td>
							<td className="city-score-table-number">
								{score.totalScoreHouses}
							</td>
						</tr>
						<tr>
              <td className="city-score-table-number">
								{score.numParks}
							</td>
							<td>
                <button
                  className='city-score-legend'
                  onClick={props.showScoringInstructionsModal('park')}
                  type='button'
                >
                  <img alt="Park icon" className="image-tile-icon" src="/img/tile-park.gif" />
                  <span>Park</span>
                </button>
							</td>
							<td>
								{score.numParks > 0 ? renderParkGroups(score.parkGroups) : "" }
							</td>
							<td className="city-score-table-number">
								{score.totalScoreParks}
							</td>
						</tr>
						<tr>
              <td className="city-score-table-number">
								{score.numShops}
							</td>
							<td>
                <button
                  className='city-score-legend'
                  onClick={props.showScoringInstructionsModal('shop')}
                  type='button'
                >
                  <img alt="Shop icon" className="image-tile-icon" src="/img/tile-shop.gif" />
                  <span>Shop</span>
                </button>
							</td>
							<td>
								{score.shopGroups.length > 0 ? renderShopGroups(score.shopGroups) : "" }
							</td>
							<td className="city-score-table-number">
								{score.totalScoreShops}
							</td>
						</tr>
						<tr>
              <td className="city-score-table-number">
								{score.numTaverns}
							</td>
							<td>
                <button
                  className='city-score-legend'
                  onClick={props.showScoringInstructionsModal('tavern')}
                  type='button'
                >
                  <img alt="Tavern icon" className="image-tile-icon" src="/img/tile-tavern-drink.gif" />
                  <span>Tavern</span>
                </button>
							</td>
							<td>
								{renderTavernIcons(score.uniqueTaverns)}
							</td>
							<td className="city-score-table-number">
								{score.totalScoreTaverns}
							</td>
						</tr>
					</tbody>
				</table>
        <ScoringInstructions />
			</div>
		);
	}

	return (
		<div>
      <Link
        to="/original/"
        className="link-back"
      >
        Back
      </Link>

      <h1 className='city-heading'>
        <img
          alt={`${cityData.token} icon`}
          className="image-city-token"
          src={`/img/token-${cityData.token}.gif`}
        />

        {cityData.name}

        <span className='city-score'>
          {cityData.score.totalScore}
        </span>
      </h1>

      <div className='city-buttons'>
        <button
          className={props.showCityTiles ? 'active' : null}
          onClick={props.handleShowCityTiles}
          type='button'
        >
          Tiles
        </button>
        <button
          className={props.showCityTiles ? null: 'active'}
          onClick={props.handleShowCityScores}
          type='button'
        >
          Scores
        </button>
      </div>

      {props.showCityTiles
        ? drawCityGrid(cityData.tiles)
        : drawScores(cityData.score)
      }

			{props.isSelectTileModalVisible === false ? null :
				<TileSelect
					hideSelectTileModal={props.hideSelectTileModal}
					tavernTypes={props.tavernTypes}
					chooseTile={props.chooseTile}
					tiles={props.tiles} />
			}
		</div>
	);
}

export default City;
