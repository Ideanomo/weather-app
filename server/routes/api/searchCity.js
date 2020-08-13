const fetch = require("node-fetch");
const User = require('../../server');
let city;

module.exports = (app) => {
    // POST from the search box
    app.post("/city", (req, res) => {
        let result = new User.getCity(req.body);
        result.save()
            .then(value => {
                console.log("City: ", value.city);
                city = value.city;
                // Validate city
                if(!city || isNaN(city) === false) {
                    res.redirect("/error");
                } else {
                    res.redirect("/current-weather");
                }
            })
            .catch(err => res.status(400).send("unable to save to database"));
    });

    // GET
    app.get("/weather", (req, res) => {
        // API url with city name
        const url = "http://api.openweathermap.org/data/2.5/weather?q=";
        const key = process.env.API_KEY; // Pull in key from environment variable
        const metric = "&units=metric"; // Set to celsius as per openweathermap docs
        const endpoint = url + city + metric + key;

        // console.log('endpoint: ', endpoint);

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                // console.log("Data: ", data);
                res.send({ data }); // the '/current-weather' route will use this data when didMount() is called
            })
            .catch((err) => {
                res.redirect("/error")
            });
    });
};