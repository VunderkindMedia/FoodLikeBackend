const express = require('express');
const {
  categoriesGet, insertAllCategories
} = require('../controllers');

const categoriesRouter = express.Router();

categoriesRouter.get('/get', categoriesGet);

categoriesRouter.get('/insertAll', insertAllCategories)

module.exports = categoriesRouter;
