const clientsRouter = require('./clients');
const pushRouter = require('./push');
const imagesRouter = require('./images');
const settingsRouter = require('./settings');
const uploadsRouter = require('./uploads');
const ordersRouter = require('./orders');
const hooksRouter = require('./hooks');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');

module.exports = {
  clientsRouter, pushRouter, imagesRouter, settingsRouter, uploadsRouter, ordersRouter, hooksRouter, productsRouter, categoriesRouter
};

