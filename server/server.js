const express = require("express");
const app = express();

// Require and configure dotenv
require('dotenv').config();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PORT 8080");
});

const port = process.env.PORT || "8080";
app.listen(port, () => console.log(`Listening on port ${port}`));

