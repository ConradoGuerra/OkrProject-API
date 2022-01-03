//Importing the express
const express = require("express");
//Importing the routes
const userRoutes = require("./routes/user");
const okrRoutes = require('./routes/okr')
//Importing mongoose
const mongoose = require("mongoose");
const config = require('./config/config')

//Using express to create a server
const app = express();

//Parsing the JSON data received
app.use(express.json());

//Setting especial headers to avoid CORS error
app.use((req, res, next) => {
  //Allow all the browsers to access the data
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Allow to use specific methods and headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Creating the user routes
app.use(userRoutes);
//Creating the okr routes
app.use(okrRoutes)

//Creating the error middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

//Connecting to mongodb and listening to the port 8080
mongoose
  .connect(config.mongodb_DB)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
