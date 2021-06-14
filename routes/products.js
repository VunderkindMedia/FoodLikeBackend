const express = require('express');
const {
  productsGet, insertAllProduct, productChange, productCreate
} = require('../controllers');

const productsRouter = express.Router();

productsRouter.post('/create', productCreate);

productsRouter.get('/get', productsGet);

productsRouter.post('/change', productChange);

productsRouter.get('/insertAll', insertAllProduct)

module.exports = productsRouter;
