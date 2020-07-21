const fetch = require("node-fetch");

let city;

module.exports = (app) => {
    // POST from the search box
    app.post("/city", (req, res, error) => {
        city = req.body.city;
        console.log("City", city);

        // Validate city
        if(!city) {
            res.redirect("/error");
        } else {
            res.redirect("/current-weather");
        }
    });

    // GET
    app.get("/weather", (req, res) => {
        // API url with city name
        const url = "http://api.openweathermap.org/data/2.5/weather?q=";
        const key = process.env.API_KEY; // Pull in key from environment variable
        const metric = "&units=metric"; // Set to celsius as per openweathermap docs
        const endpoint = url + city + metric + key;

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                console.log("Data: ", data);
                res.send({ data }); // the '/current-weather' route will use this data when didMount() is called
            })
            .catch((err) => {
                res.redirect("/error")
            });
    });
};

