import './css/App.css';
import './css/city-buttons.css';
import './css/city-grid.css';
import './css/city-heading.css';
import './css/city-score-table.css';
import './css/css-icons.css';
import './css/footer.css';
import './css/header.css';
import './css/images.css';
import './css/list-panel.css';
import './css/link-back.css';
import './css/modal.css';
import './css/social-links.css';
import './css/scoring-guide.css';
import './css/typography.css';
import './css/webcam.css';

import React, {Component} from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import betweenTwoCitiesSetup from "./data/between-two-cities-setup";
import calculateScore from "./js/calculateScore";
import BetweenTwoCities from "./components/BetweenTwoCities";
import City from "./components/City";
import CitySummary from "./components/CitySummary";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: betweenTwoCitiesSetup.cities,
      tiles: betweenTwoCitiesSetup.tileTypes,
      game: betweenTwoCitiesSetup.game,
      isSelectTileModalVisible: false,
      isWebcamVisible: false,
      showCityTiles: true,
      tileToUpdate: null,
      isLoading: false
    };

    this.renderCitySummaries = this.renderCitySummaries.bind(this);
    this.showSelectTileModal = this.showSelectTileModal.bind(this);
    this.hideSelectTileModal = this.hideSelectTileModal.bind(this);
    this.chooseTile = this.chooseTile.bind(this);
    this.updateSetupData = this.updateSetupData.bind(this);
    this.handleShowCityTiles = this.handleShowCityTiles.bind(this);
    this.handleShowCityScores = this.handleShowCityScores.bind(this);
    this.toggleWebcam = this.toggleWebcam.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleCameraClick = this.handleCameraClick.bind(this);
  }

  async handleCameraClick(image) {
    
    var list = document.getElementsByClassName('city-grid')[0];
    var items = list.getElementsByTagName('li')

    var rows = await this.roboflowPredict(image);
    this.toggleLoading(false);
    
    for(var i = 0; i < items.length; i++)
    {
      var button = items[i].getElementsByTagName('button')[0];
      var number = button.getAttribute('data-number');
      var city = button.getAttribute('data-city');
      var cameraResponse = rows.data.gridRows[number];
      var itemName = cameraResponse.itemName ? cameraResponse.itemName.toLowerCase().split('-')[0] : null;
      var itemSpecial = cameraResponse.itemName ? cameraResponse.itemName.toLowerCase().split('-')[1] : null;
    
      this.updateSetupData(itemName,itemSpecial, city, number);
    }
  }

  async roboflowPredict(image) {
    const payload = {image}
    return await axios({
        method: "POST",
        url: "https://aqco4tv2c5.execute-api.us-east-1.amazonaws.com/staging",
        data: payload
    });
}

  handleShowCityTiles(){
    this.setState({
      showCityTiles: true,
    });
  }

  handleShowCityScores(){
    this.setState({
      showCityTiles: false,
    });
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

  toggleWebcam(isVisible) {
    this.setState({
      isWebcamVisible: isVisible
    });
  }

  toggleLoading(isLoading) {
    this.setState({
      isLoading
    })
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

  render() {
    return (
      <div className="wrapper">
        <Router basename='/'>
            <Route
              exact path="/"
              render={props=>
                <BetweenTwoCities
                  game={this.state.game}
                  cities={this.state.cities}
                  renderCitySummaries={this.renderCitySummaries}
                  {...props}
                />
              }
            />
            <Route
              path="/city"
              render={props =>
                <City
                  game={this.state.game}
                  tiles={this.state.tiles}
                  isSelectTileModalVisible={this.state.isSelectTileModalVisible}
                  cities={this.state.cities}
                  showCityTiles={this.state.showCityTiles}
                  chooseTile={this.chooseTile}
                  isWebcamVisible={this.state.isWebcamVisible}
                  isLoading={this.state.isLoading}
                  handleShowCityScores={this.handleShowCityScores}
                  handleShowCityTiles={this.handleShowCityTiles}
                  showSelectTileModal={this.showSelectTileModal}
                  hideSelectTileModal={this.hideSelectTileModal}
                  toggleWebcam={this.toggleWebcam}
                  toggleLoading={this.toggleLoading}
                  handleCameraClick={this.handleCameraClick}
                  {...props}
                />
              }
            />
        </Router>
    </div>
    );
  }
}

export default App;
