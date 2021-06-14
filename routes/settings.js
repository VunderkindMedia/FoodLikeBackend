const express = require('express');
const {
  getSettings, changeSettings, createSettings, changeLocalConfig, getLocalConfig
} = require('../controllers');

const settingsRouter = express.Router();

settingsRouter.get('/change', changeSettings);
settingsRouter.get('/get', getSettings);
settingsRouter.get('/create', createSettings);
settingsRouter.get('/changeConfig', changeLocalConfig);
settingsRouter.get('/getConfig', getLocalConfig);

module.exports = settingsRouter;
