import React, { Component } from "react";
import Search from "./Search";

// Weather icons
import rain from "../assets/icons/rain.png";
import cloud from "../assets/icons/cloud.png";
import thunder from "../assets/icons/thunder.png";
import mist from "../assets/icons/mist.png";
import clear from "../assets/icons/clear.png";
import snow from "../assets/icons/snow.png";

class CurrentWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      dt: "",
      city: "",
      description: "",
      fells_like: "",
      wind: "",
      cloud: "",
      pressure: "",
      sunrise: "",
      sunset: "",
      celsius: "",
      fahrenheit: "",
      degreeType: "celsius",
    };
  }

  handleRadioChange = (event) => {
    this.setState(
      {
        degreeType: event.target.value,
      },
      () => console.log(this.state)
    );
  };

  timestampConverter = (timestamp, isSunriseSunset) => {
    let d = new Date(timestamp * 1000);
    let time;
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let date = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();

    // Check if sunrise or sunset
    if (timestamp && !isSunriseSunset) {
      time = `${date} ${month} ${year}, ${hour}:${min}`;
    } else if (isSunriseSunset) {
      time = `${hour}:${min}`;
    }
    return time;
  };

  // Convert celsius to fahrenhiet
  tempConverter = (value) => {
    return Math.round((value * 9) / 5 + 32);
  };

  componentDidMount() {
    fetch("/weather")
      .then((res) => res.json())
      .then((value) => {
        let fahrenheit = Math.round((value.data.main.temp * 9) / 5 + 32);
        let celsius = Math.round(value.data.main.temp);

        let ID = value.data.weather[0].id;
        // Select icon
        if (ID === 800) {
          this.setState({ icon: clear });
        } else if (ID >= 200 && ID <= 232) {
          this.setState({ icon: thunder });
        } else if (ID >= 300 && ID <= 531) {
          this.setState({ icon: rain });
        } else if (ID >= 600 && ID <= 622) {
          this.setState({ icon: snow });
        } else if (ID >= 701 && ID <= 781) {
          this.setState({ icon: mist });
        } else if (ID >= 801 && ID <= 804) {
          this.setState({ icon: cloud });
        }

        this.setState({
          dt: value.data.dt,
          city: value.data.name,
          temp:
            this.state.degreeType === "celsius"
              ? celsius + "°C"
              : fahrenheit + "°F",
          description: value.data.weather[0].description,
          feels_like: value.data.main.feels_like,
          humidity: value.data.main.humidity,
          wind: value.data.wind.speed,
          cloud: value.data.clouds.all,
          pressure: value.data.main.pressure,
          sunrise: value.data.sys.sunrise,
          sunset: value.data.sys.sunset,
          celsius: celsius,
          fahrenheit: fahrenheit,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Search />
        <ToggleTemperature
          handleRadioChange={this.handleRadioChange}
          degreeType={this.state.degreeType}
        />
        <div className="weather-widget">
          <h4 className="weather-widget_city">Weather in {this.state.city}</h4>
          <h5 className="weather-widget_temp">
            <img src={this.state.icon} alt="icon" />
            {this.state.degreeType === "celsius"
              ? this.state.celsius + "°C"
              : this.state.fahrenheit + "°F"}
          </h5>
          <p className="weather-widget_dt">
            {this.timestampConverter(this.state.dt, false)}
          </p>
          <p className="weather-widget_description">
            {this.state.description.replace(/^\w/, (c) => c.toUpperCase())}
          </p>

          <table className="table table-sm table-bordered table-striped">
            <tbody>
              <tr>
                <td>Wind</td>
                <td>{this.state.wind} m/s</td>
              </tr>
              <tr>
                <td>Cloudiness</td>
                <td>
                  {this.state.description.replace(/^\w/, (c) =>
                    c.toUpperCase()
                  )}
                </td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{this.state.pressure} hpa</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{this.state.humidity} %</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>{this.timestampConverter(this.state.sunrise, true)}</td>
              </tr>
              <tr>
                <td>Sunset</td>
                <td>{this.timestampConverter(this.state.sunset, true)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default CurrentWeather;
