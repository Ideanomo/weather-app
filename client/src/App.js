import React, { Component }from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Error from "./components/Error";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <main className="container weather-app">
                    <div className="starter-template topic">
                        <h1 className="h2 mb-3">Weather Forecast</h1>
                    </div>

                    <Switch>
                        <Route exact path="/" component={Search}/>
                        <Route exact path="/current-weather" component={CurrentWeather} />
                        <Route path="/error" component={Error} />
                    </Switch>
                </main>
            </BrowserRouter>
        )
    }
}

export default App;