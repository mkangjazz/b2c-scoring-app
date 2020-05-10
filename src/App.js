import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import betweenTwoCitiesSetup from "./data/between-two-cities-setup";
import calculateScore from "./js/calculateScore";

import BetweenTwoCities from "./components/BetweenTwoCities";
import Capitals from "./components/Capitals";
import City from "./components/City";
import CitySummary from "./components/CitySummary";
import Home from "./components/Home";

import './css/App.css';
import './css/city-grid.css';
import './css/city-score-table.css';
import './css/css-icons.css';
import './css/header.css';
import './css/images.css';
import './css/list-panel.css';
import './css/modal.css';
import './css/typography.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: betweenTwoCitiesSetup.cities,
      isSelectTileModalVisible: false,
      isScoringInstructionsModalVisible: false,
			tavernTypes: betweenTwoCitiesSetup.tavernTypes,
      tiles: betweenTwoCitiesSetup.tileTypes,
      tileToUpdate: null,
    };

    this.renderCitySummaries = this.renderCitySummaries.bind(this);
    this.showSelectTileModal = this.showSelectTileModal.bind(this);
    this.hideSelectTileModal = this.hideSelectTileModal.bind(this);
    this.chooseTile = this.chooseTile.bind(this);
    this.updateSetupData = this.updateSetupData.bind(this);

    this.showScoringInstructionsModal = this.showScoringInstructionsModal.bind(this);
    this.hideScoringInstructionsModal = this.hideScoringInstructionsModal.bind(this);
	}
  
  showSelectTileModal(e){
    var number = e.currentTarget.getAttribute("data-number");
    var city = e.currentTarget.getAttribute("data-city");

    this.setState({
      tileToUpdate: {
        city: city,
        number: number,
      },
      isSelectTileModalVisible: true
    });
  }

  hideSelectTileModal(){
    this.setState({
      tileToUpdate: null,
      isSelectTileModalVisible: false
    });
  }

  chooseTile(e){
    var tileType = e.currentTarget.getAttribute("data-tile-token");
    var tileTypeSpecial = e.currentTarget.getAttribute("data-tile-type-special");
    var tileCityToken = this.state.tileToUpdate.city;
    var tileNumber = this.state.tileToUpdate.number;

    this.updateSetupData(tileType, tileTypeSpecial, tileCityToken, tileNumber);
  }

  updateSetupData(tileType, tileTypeSpecial, tileCityToken, tileNumber){
    var targetCity = betweenTwoCitiesSetup.cities.filter(obj => obj["token"] === tileCityToken);
    var targetTile = targetCity[0].tiles[tileNumber];
    
    targetTile["type"] = tileType;
    targetTile["typeSpecial"] = tileTypeSpecial;

    calculateScore(betweenTwoCitiesSetup.cities);

    this.setState({
      cities: betweenTwoCitiesSetup.cities,
      isSelectTileModalVisible: false,
      tileToUpdate: null,
    });
  }

	renderCitySummaries(cities){
		var cityListItems = cities.map((city)=>{
			return <CitySummary score={city.score} token={city.token} name={city.name} key={city.token} />
		});

		return cityListItems;
  };

  showScoringInstructionsModal(e){
    this.setState({
      isScoringInstructionsModalVisible: true
    });
  }

  hideScoringInstructionsModal(){
    this.setState({
      isScoringInstructionsModalVisible: false
    });
  }

	render() {
		return (
      <div className="wrapper">
        <Router>
            <Route
              path="/"
              exact component={Home} 
            />
            <Route
              path="/original/"
              render={props => 
                <BetweenTwoCities 
                  renderCitySummaries={this.renderCitySummaries} 
                  cities={this.state.cities} 
                  {...props} 
                />
              }
            />
            <Route
              path="/city"
              render={props => 
                <City
                  tiles={this.state.tiles}
                  chooseTile={this.chooseTile} 
                  isSelectTileModalVisible={this.state.isSelectTileModalVisible}
                  isScoringInstructionsModalVisible={this.state.isScoringInstructionsModalVisible}
                  cities={this.state.cities} 
                  showSelectTileModal={this.showSelectTileModal} 
                  hideSelectTileModal={this.hideSelectTileModal}
                  showScoringInstructionsModal={this.showScoringInstructionsModal}
                  hideScoringInstructionsModal={this.hideScoringInstructionsModal}
                  // {...props}
                />
              }
            />
            <Route
              path="/capitals"
              component={Capitals}
            />
        </Router>
    </div>
		);
	}
}

export default App;
