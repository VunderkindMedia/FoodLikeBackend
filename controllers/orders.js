const {Orders} = require('../models');
const {isEmpty} = require('../helpers/insruments');
const fetch = require('node-fetch');
const {posterApiToken} = require('../api/consts');
const {posterApiURL} = require('../api/consts');

const orderCreate = async (req, res, next) => {
  const orderHook = req.body;
    const urlOrder = `${posterApiURL}incomingOrders.getIncomingOrder?token=${posterApiToken}&incoming_order_id=${orderHook.object_id}`;
    const responseOrder = await fetch(urlOrder);
    const orderJson = await responseOrder.json();
    const order = orderJson.response;
    Orders.find({incoming_order_id: order.incoming_order_id}, (err,document) => {
    console.log(document);
    if (document.length > 0) {
      res.send({
        response: {
          msg: 'Заказ уже существует',
        }
      })
    } else {
      Orders.create({...order, text_status: 'open'}).then((doc) => res.send({
        response: {
          msg: 'Заказ создан',
          data: doc
        }
      }))
    }
  })
   // await Orders.create({...order, text_status: 'open'}).then((doc) => res.send({
   //      response: {
   //        msg: 'Заказ создан',
   //        data: doc
   //      }
   //    }))
  return order;
};

const changeOrder = async (req, res, next, text_status) => {
  const orderHook = req.body;
  const urlOrder = `${posterApiURL}incomingOrders.getIncomingOrder?token=${posterApiToken}&incoming_order_id=${orderHook.object_id}`;
  const responseOrder = await fetch(urlOrder);
  const orderJson = await responseOrder.json();
  const order = orderJson.response;


  await Orders.findOneAndUpdate({'incoming_order_id': orderHook.object_id},
      {...order, text_status: text_status}, { runValidators: true }, ((err, doc) => {
        res.send({response: {
            msg: 'Заказ обновлен',
            data: doc
          }})
        if (err) throw err
      }))
  return order;
}

const changeOrderByTransaction = async (req, res, next, text_status) => {
  const transHook = req.body;
  let order = null;

  await Orders.findOneAndUpdate({'transaction_id': transHook.object_id},
      { text_status: text_status }, { runValidators: true }).then((doc) => {
    res.send({response: {
        msg: 'Заказ обновлен',
        data: doc
      }})
    order = doc
  }).catch(e => console.log(e))

  return order;
}

const deleteOrder = async (req, res, next) => {
  const orderHook = req.body;
  Orders.findOneAndRemove({incoming_order_id: orderHook.object_id}).then(doc => {
    res.send({
      response: {
        msg: 'Заказ удален',
        data: doc
      }
    })
  })
}

const ordersGet = async (req, res, next) => {
  const date = req.query;
    Orders.find(date)
    .then((orders)=> res.send({ data: orders }))
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
}

const insertAll = async (req, res, next) => {

  const url = `${posterApiURL}incomingOrders.getIncomingOrders?token=${posterApiToken}`;

  const response = await fetch(url);
  const data = await response.json();
  data.response.forEach(order => {
    Orders.findOne({incoming_order_id: order.incoming_order_id}).then(document => {
      if (!document) {
        Orders.create(order)
      } else {
        Orders.findOneAndUpdate({incoming_order_id: order.incoming_order_id}, order).then(doc => {
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
  // Orders.create(data.response, (err, list) => {
  //   res.send({ data: list })
  //   if (err) throw err
  // })
}

module.exports = {
  ordersGet, orderCreate, insertAll, deleteOrder, changeOrder, changeOrderByTransaction
};
