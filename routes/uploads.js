const express = require('express');
const {
  imageGet
} = require('../controllers');

const uploadsRouter = express.Router();

uploadsRouter.get('/*', imageGet);

module.exports = uploadsRouter;
