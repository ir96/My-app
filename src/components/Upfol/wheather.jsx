import React from "react";
import Sunimg from "../../source/image/sunc.jpg";
export default class Wheather extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { location, temp_c, isDay, text, iconURL } = this.props;
        return (
            <div className="wecont">
                <div className="header">{location}</div>
                <div className="incont">
                    <div className="image">
                    <img src={iconURL} />
                    </div>
                    <div className="curwh">{temp_c}°</div>
                </div>
                <div className="footer">{text}</div>
            </div>
        );
    }

}