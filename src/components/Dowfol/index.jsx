import React from "react";
import "./style.scss";
import Forcastday from "./forcastday";
export default class Downcol extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render() {
        const { forecastdays } = this.props;
        return (
          <div className="botmcont">
            <div className="incont">
              {forecastdays &&
                forecastdays.map((day, idx) => {
                  return <Forcastday day={day.day} key={idx} />;
                })}
            </div>
          </div>
        );
      }
    }