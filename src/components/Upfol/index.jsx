import React from "react";
import "./style.scss";
import Wheather from "./wheather";
import { Manager, Reference, Popper } from "react-popper";
export default class Topcol extends React.Component{
    constructor(props){
        super(props);
        this.state={
        isSelectLocationOpen: false
        };
    }
    onToggleSelectLocation() {
        this.setState(prevState => ({
          isSelectLocationOpen: !prevState.isSelectLocationOpen
        }));
      }

      onLocationNameChange(e) {
        this.setState({
          locationName: e.target.value
        });
      }
    
      onSelectCity() {
        const { locationName } = this.state;
        const { eventEmitter } = this.props;
        eventEmitter.emit("updateWeather", locationName);
        this.setState({ isSelectLocationOpen: false });
      }

    render(){
        const { isSelectLocationOpen } = this.state;
        const { eventEmitter } = this.props;
        return (
            <div className="stopcontain">
            <div className="stitle">Weather App</div>
            <Wheather {...this.props}/>
            <Manager>
          <Reference>
            {({ ref }) => (
              <button
                className="boton setbut"
                ref={ref}
                onClick={this.onToggleSelectLocation.bind(this)}
              >
                Search City
              </button>
            )}
          </Reference>
          <Popper placement="Upfol">
            {({ ref, style, placement, arrowProps }) =>
              isSelectLocationOpen && (
                <div
                  className="popup-container"
                  ref={ref}
                  style={style}
                  data-placement={placement}
                >
                  <div className="form-container">
                    <label htmlFor="location-name">Location Name</label>
                    <input
                      id="location-name"
                      type="text"
                      placeholder="Enter City Name"
                      onChange={this.onLocationNameChange.bind(this)}
                    />
                    <button
                      className="boton setbut"
                      onClick={this.onSelectCity.bind(this)}
                    >
                        Search
                    </button>
                  </div>
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </div>
              )
            }
          </Popper>
        </Manager>
        </div>
        );
    }
}