const parentRouter = require('express').Router();

const userRoutes = require('./user');

parentRouter.use('/user', userRoutes);

module.exports = parentRouter;
