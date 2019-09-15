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

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: betweenTwoCitiesSetup.cities,
      isSelectTileModalVisible: false,
			tavernTypes: betweenTwoCitiesSetup.tavernTypes,
      tiles: betweenTwoCitiesSetup.tileTypes,
      tileToUpdate: null,
    };

    this.renderCitySummaries = this.renderCitySummaries.bind(this);
    this.showSelectTileModal = this.showSelectTileModal.bind(this);
    this.hideSelectTileModal = this.hideSelectTileModal.bind(this);
    this.chooseTile = this.chooseTile.bind(this);
    this.updateSetupData = this.updateSetupData.bind(this);
	}
  
  showSelectTileModal(e){
    var number = e.target.getAttribute("data-number");
    var city = e.target.getAttribute("data-city");

    this.setState({
      tileToUpdate: {
        city: city,
        number: number
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
    var tileType = e.target.getAttribute("data-tile-token");
    var tileTypeSpecial = e.target.getAttribute("data-tile-type-special");
    var tileCityToken = this.state.tileToUpdate.city;
    var tileNumber = this.state.tileToUpdate.number;

    this.updateSetupData(tileType, tileTypeSpecial, tileCityToken, tileNumber);

    this.setState({
      isSelectTileModalVisible: false,
      cities: betweenTwoCitiesSetup.cities,
      tileToUpdate: null,
    });
  }

  updateSetupData(tileType, tileTypeSpecial, tileCityToken, tileNumber){
    var targetTile = betweenTwoCitiesSetup.cities.filter(obj => obj["token"] === tileCityToken)[0].tiles[tileNumber];
    
    targetTile["type"] = tileType;
    targetTile["typeSpecial"] = tileTypeSpecial;

    calculateScore(betweenTwoCitiesSetup.cities);

    this.setState({
      cities: betweenTwoCitiesSetup.cities
    });
  }

	renderCitySummaries(cities){
		var cityListItems = cities.map((city)=>{
			return <CitySummary token={city.token} name={city.name} key={city.token} />
		});

		return cityListItems;
  };

	render() {

		return (
      <div className="wrapper">
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/between-two-cities/" render={props => <BetweenTwoCities renderCitySummaries={this.renderCitySummaries} cities={this.state.cities} {...props} />} />
            <Route path="/city" render={props => <City tiles={this.state.tiles} chooseTile={this.chooseTile} isSelectTileModalVisible={this.state.isSelectTileModalVisible} cities={this.state.cities} showSelectTileModal={this.showSelectTileModal}  {...props} />} />
            <Route path="/capitals" component={Capitals} />
        </Router>
    </div>
		);
	}
}

export default App;
