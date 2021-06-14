const {
  clientCreate, clientGet
} = require('./clients');

const {
  pushSend, pushGet, pushOrderSend
} = require('./push');

const {
  imageUpoload, imagesGet, imageGet, imageRemove, imageSave
} = require('./images');

const {
  getSettings, changeSettings, createSettings, changeLocalConfig, getLocalConfig
} = require('./settings');

const {
  orderCreate, ordersGet, insertAll, deleteOrder, changeOrder, changeOrderByTransaction
} = require('./orders');

const {
  productChange, productCreate, productsGet, productDelete, insertAllProduct
} = require('./products');
const {
  categoriesChange, categoriesCreate, categoriesGet, categoryDelete, insertAllCategories
} = require('./categories');

module.exports = {
  clientCreate, clientGet,
  pushSend, pushGet, pushOrderSend,
  getSettings, changeSettings, createSettings, changeLocalConfig, getLocalConfig,
  imageUpoload, imagesGet, imageGet, imageRemove, imageSave,
  orderCreate, ordersGet, insertAll, deleteOrder, changeOrder, changeOrderByTransaction,
  productChange, productCreate, productsGet, productDelete, insertAllProduct,
  categoriesChange, categoriesCreate, categoriesGet, categoryDelete, insertAllCategories
}
