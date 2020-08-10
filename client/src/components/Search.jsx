import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
    };
  }

  handleChangeCity = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <form className="form-inline" action="/city" method="POST">
          <label className="sr-only" htmlFor="inlineFormInputCity">
            Enter your city
          </label>
          <input
            className="form-control mb-2 mr-sm-2"
            id="inlineFormInputCity"
            type="text"
            placeholder="Enter city"
            name="city"
            value={this.state.city}
            onChange={this.handleChangeCity}
          />
          <button className="btn btn-primary mb-2" type="submit" value="submit">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Search;
