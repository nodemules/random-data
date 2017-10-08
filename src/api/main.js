const express = require('express');

const api = express.Router();

const personController = require.main.require('./src/api/person/controller/personController');

api.use('/person', personController);

module.exports = api;
