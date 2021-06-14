const express = require('express');
const {
  clientCreate, clientGet
} = require('../controllers');

const clientsRouter = express.Router();

clientsRouter.get('/add', clientCreate);
clientsRouter.get('/get', clientGet);

// userRouter.get('/delete', usersDel);



module.exports = clientsRouter;
