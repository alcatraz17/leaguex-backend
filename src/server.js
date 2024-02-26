'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis');
const cron = require('node-cron');
require('dotenv').config();
const refreshCache = require('../cron/refreshCache');
const router = require('./routes/index');

const app = express();
const { MONGO_URI, PORT } = process.env;

/////////////////////////////////////////////////// Middlewares ///////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose.set('strictQuery', false);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

try {
  mongoose.connect(MONGO_URI);
} catch (error) {
  console.error('Connection to the database failed!');
}

const db = mongoose.connection;

// console.log(global.redisClient);

db.on('error', (error) => {
  console.error('Connection to the database failed!');
  console.error(error);
});

db.once('open', () => {
  console.log('Connection to the database successful!');
});

app.use('/api', router);

cron.schedule('*/15 * * * *', refreshCache);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

module.exports = app;
