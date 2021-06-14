const express = require('express');
const {
  ordersGet, insertAll
} = require('../controllers');

const ordersRouter = express.Router();

ordersRouter.get('/get', ordersGet);

ordersRouter.get('/insertAll', insertAll)

module.exports = ordersRouter;
