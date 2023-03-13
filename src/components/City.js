import React from 'react';
import { Link } from "react-router-dom";
import CityGridSquare from "./CityGridSquare";
import TileSelect from "./TileSelect";
import utility from '../js/utility';
import WebcamView from './WebcamView';
import LoadingOverlay from 'react-loading-overlay';


function City(props) {
	var urlParams = new URLSearchParams(props.location.search);

  var token = urlParams.get('token');
	var cityData = (props.cities.filter(obj => obj["token"] === token))[0];

	function drawCityGrid(tiles){
		var grid = tiles.map((tile, index) => {
			return <CityGridSquare type={tile.type} typeSpecial={tile.typeSpecial} showSelectTileModal={props.showSelectTileModal} number={index} city={token} key={index} />
		});

		return (
			<ol className={`city-grid ${props.game.grid}`}>
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
              <span className="city-score-modifier">
                {`x${nonHouseTypes.length} per`}
              </span>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}

	function renderHouseFactoryAdjacencies(housesNextToFactories) {
    const rows = [];
    for (let i = 0; i < housesNextToFactories; i += 1) {
      rows.push(
        <tr key={`row-${i}`}>
          <td>
            <div className="css-icon-container">
              <span className='house'></span>
            </div>
            <div className="css-icon-container">
              <span className='factory'></span>
            </div>
            <span className="city-score-modifier">
              {`x1 per`}
            </span>
            &nbsp;
          </td>
        </tr>
      );
    }
		return (
			<table>
				<tbody>
          {rows}
				</tbody>
			</table>
		);
	}
	function renderOfficesByTaverns(offices) {
    const rows = [];
    for (let i = 0; i < offices; i += 1) {
      rows.push(
        <tr key={`office-${i}`}>
          <td>
            <div className="css-icon-container">
              <span className="office"></span>
            </div>
            <div className="css-icon-container">
              <span className="tavern"></span>
            </div>
            <span className="city-score-modifier">+1</span>
          </td>
        </tr>
      );
    }
		return (
			<table>
				<tbody>
          { rows }
				</tbody>
			</table>
		);
	}

	function renderParkGroups(groups) {
		const rows = groups.map((group, index) => {
      const icons = [];
      for (let i = 0; i < group.length; i += 1) {
        icons.push(
          <div key={`group-${index}-park-icon-${i}`} className="css-icon-container">
            <span className="park"></span>
          </div>
        );
      }
      return (
        <tr key={`group-${index}`}>
          <td>
            { icons }
            {group.length === 2 ? <span className="city-score-modifier">+8</span> : null }
            {group.length === 3 ? <span className="city-score-modifier">+12</span> : null }
            {group.length > 3 ? <span className="city-score-modifier">{`+${String(12 + group.length - 3)}`}</span> : null }
          </td>
        </tr>
      );
    });
		return (
			<table>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}

	function renderTavernIcons(groups) {
		const icons = groups.map((group, index) =>
      { return group.length > 0
        ? <tr key={`group-${index}`}>
            <td className="tavern-icon-score-group">
              {group.map((str,index) => (
                <div key={`img-${str}-${index}`} className="image-special-tavern-icon">
                  <img
                    alt={`${str} icon`}
                    key={`${str}-${index}`}
                    src={utility.prependWithPublicUrl(`/img/icon-tavern-${str}.png`)}
                  />
                </div>
              ))}
              <span className="city-score-modifier">
                {group.length === 1 ? '+1' : ''}
                {group.length === 2 ? '+4' : ''}
                {group.length === 3 ? '+9' : ''}
                {group.length === 4 ? '+17' : ''}
              </span>
            </td>
          </tr> 
        : null 
      }
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
		var rows = arr.map((group, index) => {
      const shopIcons = [];
      for (let i = 0; i < group.length; i += 1) {
        shopIcons.push(
          <div 
            className="css-icon-container"
            key={`group-${index}-shop-${i}`}
          >
            <span className="shop"></span>
          </div>
        );
      }
			return (
				<tr key={`${group}-${index}`}>
					<td>
            { shopIcons }
            {group.length === 2 ? <span className="city-score-modifier">+5</span> : null }
            {group.length === 3 ? <span className="city-score-modifier">+10</span> : null }
            {group.length === 4 ? <span className="city-score-modifier">+16</span> : null }
					</td>
				</tr>
			);
		});
		return (
			<table>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}

	function drawScores(score){
		return (
			<div>
				<table className="city-score-table">
					<thead>
						<tr>
							<th className="city-score-table-number">#</th>
							<th>Tile</th>
							<th>Sets and Modifiers</th>
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
									type='button'
								>
									<img 
                    alt="Factory icon" 
                    className="image-tile-icon" 
                    src={utility.prependWithPublicUrl('/img/tile-factory.gif')} 
                  />
									<span>Factory</span>
								</button>
							</td>
							<td>
								<table>
									<tbody>
										<tr>
                      <td>
                        {score.factoryMultiplier === 4 
                          ? <React.Fragment>
                              <img 
                                className='image-medal-icon' 
                                alt='Gold medal' 
                                src={utility.prependWithPublicUrl('/img/icon-gold.gif')} 
                              />
                                Most
                          </React.Fragment>
                          : null
                        }
                        {score.factoryMultiplier === 3 
                          ? <React.Fragment>
                              <img 
                                className='image-medal-icon' 
                                alt='Silver medal' 
                                src={utility.prependWithPublicUrl('/img/icon-silver.gif')} 
                              />
                                Second-Most
                          </React.Fragment>
                          : null
                        }
                        {score.factoryMultiplier > 2 ? <span className='city-score-modifier'>x{score.factoryMultiplier} per</span>: null}
                      </td>
										</tr>
									</tbody>
								</table>
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
                  type='button'
                >
                  <img 
                    alt="Office icon" 
                    className="image-tile-icon" 
                    src={utility.prependWithPublicUrl('/img/tile-office.gif')} 
                  />
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
                  type='button'
                >
                  <img 
                    alt="House icon"
                    className="image-tile-icon"
                    src={utility.prependWithPublicUrl('/img/tile-house.gif')} 
                  />
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
                  type='button'
                >
                  <img 
                    alt="Park icon" 
                    className="image-tile-icon" 
                    src={utility.prependWithPublicUrl('/img/tile-park.gif')} 
                  />
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
                  type='button'
                >
                  <img 
                    alt="Shop icon" 
                    className="image-tile-icon" 
                    src={utility.prependWithPublicUrl('/img/tile-shop.gif')} 
                  />
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
                  type='button'
                >
                  <img 
                    alt="Tavern icon" 
                    className="image-tile-icon" 
                    src={utility.prependWithPublicUrl('/img/tile-tavern-drink.gif')} 
                  />
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
			</div>
		);
	}

	return (
		<div>
      <Link
        to="/"
        className="link-back"
      >
        Back
      </Link>

      <h1 className='city-heading'>
        <img
          alt={`${cityData.token} icon`}
          className="image-city-token"
          src={utility.prependWithPublicUrl(`/img/token-${cityData.token}.gif`)}
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
        <button
          onClick={() => props.toggleWebcam(true)}
          type='button'
        >
          Take Photo
        </button>
      </div>


      {props.unidentifiedTiles > 0 && !props.isLoading ? <div className='message-area'>Identified {props.identifiedTiles} of 16 tiles.</div> : null }

      <LoadingOverlay
        active={props.isLoading}
        spinner
        text='Processing image ...'
      >

        {props.showCityTiles
          ? drawCityGrid(cityData.tiles)
          : drawScores(cityData.score)
        }
      </LoadingOverlay>

      {props.isWebcamVisible === false ? 
        null : <WebcamView 
          toggleLoading={props.toggleLoading}
          toggleWebcam={props.toggleWebcam}
          handleCameraClick={props.handleCameraClick}/>
      }

			{props.isSelectTileModalVisible === false ? null :
				<TileSelect
					hideSelectTileModal={props.hideSelectTileModal}
					chooseTile={props.chooseTile}
					tiles={props.tiles} />
			}
		</div>
	);
}

export default City;
