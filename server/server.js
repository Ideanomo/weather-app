const express = require("express");
const app = express();

// Configure dotenv
require('dotenv').config();
// Load route handlers
require("./routes")(app);

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Load API routes
require("./routes")(app);

app.get("/", (req, res) => {
    res.send("PORT 8080");
});

const port = process.env.PORT || "8080";
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;