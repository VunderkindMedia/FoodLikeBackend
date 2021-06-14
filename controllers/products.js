const {Products} = require('../models');
const fetch = require('node-fetch');
const {posterApiToken} = require('../api/consts');
const {posterApiURL} = require('../api/consts');

const productCreate = async (req, res, next) => {

  const productHook = req.body;
    const productURL = `${posterApiURL}menu.getProduct?token=${posterApiToken}&product_id=${productHook.object_id}`;
    const productResponse = await fetch(productURL);
    const productJson = await productResponse.json();
    const product = productJson.response;
    Products.find({product_id: product.product_id}, (err,document) => {
      if (document.length > 0) {
        res.send({
          response: {
            msg: 'Продукт уже существует',
          }
        })
      } else {
        Products.create({...product, description: 'Описание отсутствует', weight: null}).then((doc) => res.send({
          response: {
            msg: 'Продукт создан',
            data: doc
          }
        }))
      }
    })
  return product;
};

const productChange = async (req, res, next) => {
  let product = {};
  let product_id = '';
  if (req.body.object) {
    product_id = req.body.object_id;
    const productURL = `${posterApiURL}menu.getProduct?token=${posterApiToken}&product_id=${product_id}`;
    const productResponse = await fetch(productURL);
    const productJson = await productResponse.json();
    product = productJson.response;
  } else {
    product = req.body;
    product_id = req.body.product_id;
  }

  console.log(product_id);

  await Products.findOneAndUpdate({product_id: product_id},
      product, { runValidators: true })
  .then(doc => {
    res.send({response: {
        msg: 'Продукт обновлен',
        data: doc
      }})
    })
  .catch(e => console.log(e))
  return product;
}

const productDelete = async (req, res, next) => {
  const productHook = req.body;
  Products.findOneAndRemove({product_id: productHook.object_id}).then(doc => {
    res.send({
      response: {
        msg: 'Продукт удален',
        data: doc
      }
    })
  })
}

const productsGet = async (req, res, next) => {
  const date = req.query;
    Products.find(date)
    .then((products)=> res.send({ data: products }))
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
}

const insertAllProduct = async (req, res, next) => {

  const url = `${posterApiURL}menu.getProducts?token=${posterApiToken}`

  const response = await fetch(url);
  const data = await response.json();

  data.response.forEach(product => {
    Products.findOne({product_id: product.product_id}).then(document => {
      if (!document) {
        Products.create(product)
      } else {
        Products.findOneAndUpdate({product_id: product.product_id}, product).then(doc => {
          console.log('Дубликат', doc);
        })
      }
    })
  })
  res.send({
    data: {
      msg: 'Готово'
    }
  })
  // Products.insertMany(data.response, { ordered: false }).then((docs) => {
  //   res.send({ data: docs })
  // }).catch(e => {
  //   console.log(e)
  //   res.send({ data: {
  //     msg: 'Успешно'
  //     } })
  // })

}

module.exports = {
  productsGet, productCreate, insertAllProduct, productDelete, productChange
};
