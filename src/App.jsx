import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./wrs/apps.scss";
import Topcol from "./components/Upfol/index";
import Downcol from "./components/Dowfol/index";
import axios from "axios";

const WEATHER_KEY = "05fa14e773434825be0193343191301";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "London",
      numForcastDays: 4,
      isLoading: true
    };
  }
  updateWeather(){
    const { cityName, numForcastDays } = this.state;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY}&q=${cityName}&days=${numForcastDays}`;
    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          isLoading: false,
          temp_c: data.current.temp_c,isDay: data.current.is_day,
          text: data.current.condition.text,
          iconURL: data.current.condition.icon,
          forecastdays: data.forecast.forecastday
        });
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", data => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }
  render() {
    const {isLoading,cityName,temp_c,isDay,text,iconURL,forecastdays} = this.state;
   return (
    <div className="sapp-contain">
      <div className="mains-contain">
      {isLoading && <h2>Loading Weather...</h2>}
      {!isLoading && (
        <div className="top-col">
          <Topcol 
          location={cityName}
          temp_c={temp_c}
          isDay={isDay}
          text={text}
          iconURL={iconURL}
          eventEmitter={this.props.eventEmitter}
          />
        </div>
        )}
        <div className="bottom-col">
        <Downcol forecastdays={forecastdays}/>
        </div>
      </div>
    </div>
   );
 }
}

export default App;
