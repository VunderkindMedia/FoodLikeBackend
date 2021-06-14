const express = require('express');
const multer = require('multer');
const upload = multer();
const {
  pushSend, pushGet
} = require('../controllers');

const pushRouter = express.Router();

pushRouter.post('/send', pushSend);
pushRouter.get('/get', pushGet);

module.exports = pushRouter;
