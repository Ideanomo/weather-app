const express = require("express");
const app = express();
const mongoose = require('mongoose');

let dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

// Connect to database (db)
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/weather-app',  dbOptions);

mongoose.connection.on('error', () => {
    throw new Error('unable to connect to database')
});

// Create db schema
let CitySchema = new mongoose.Schema({
    city: String
});

// Create model
let User = mongoose.model('User', CitySchema);

// Configure dotenv
require('dotenv').config();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Load route handlers
require("./routes")(app);

app.get("/", (req, res) => {
    res.send("PORT 8080");
});

const port = process.env.PORT || "8080";
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports.getCity = User;