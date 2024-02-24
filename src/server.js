"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const { URI, PORT } = process.env;
const routes = require("./src/routes");

/////////////////////////////////////////////////// Middlewares ///////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", routes);
mongoose.set("strictQuery", false);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

try {
  mongoose.connect(URI);
} catch (error) {
  console.error("Connection to the database failed!");
}

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Connection to the database failed!");
});

db.once("open", () => {
  console.log("Connection to the database successful!");
});

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

module.exports = app;
