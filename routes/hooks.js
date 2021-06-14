const express = require('express');
const {sendPushOrders} = require('../api/sendPushApi');
const {config} = require('../helpers/insruments');
const {
  categoriesCreate,
  categoriesChange,
  categoryDelete,
  productDelete,
  productChange,
  productCreate,
  pushOrderSend,
  orderCreate,
  deleteOrder,
  changeOrder,
  changeOrderByTransaction
} = require('../controllers');
const hooksRouter = express.Router();


hooksRouter.post('/', ((req, res, next) => {
  const body = req.body;
  const hook_action = body.action;
  console.log(body);
  if (body.object === 'incoming_order') {
    if (hook_action === 'added') {
      orderCreate(req, res, next, 'open').then();
    } else if (hook_action === 'changed') {
      changeOrder(req, res, next, 'accept').then((order) => {
        if (order.status === 1) {
          sendPushOrders(`Заказ №${order.incoming_order_id} принят!`, 'Ваш заказ принят к сборке', order, 'push_accept', pushOrderSend)
        } else if (order.status === 7) {
          sendPushOrders(`Заказ №${order.incoming_order_id} отклонен!`, 'Ваш заказ был отклонен.', order, 'push_canceled', pushOrderSend)
        }
      });
    } else if (hook_action === 'closed') {
      changeOrder(req, res, next, 'end').then((order) => sendPushOrders('Большое спасибо за покупку', `Заказ №${order.incoming_order_id} завершен!`, order,  'push_end', pushOrderSend));
    } else if (hook_action === 'removed') {
      deleteOrder(req, res, next).then()
    } else {
      res.send({
        data: {
          msg: `Экшн "${hook_action}" еще не обработан`
        }
      })
    }
  } else if (body.object === 'transaction') {
    const history = JSON.parse(body.data).transactions_history;
    if (hook_action === 'added') {
      //Товар добавлен
      res.send({
        data: {
          msg: 'Success'
        }
      })
    } else if (hook_action === 'changed') {
     if (history.value === 30) {
       //Приготовлен
       changeOrderByTransaction(req, res, next, 'ready').then((order) => sendPushOrders(`Заказ №${order.incoming_order_id} собран 📦 и ожидает отправки`, 'Мы сообщим, когда курьер поедет 🛵 к Вам', order,  'push_ready', pushOrderSend));
      } else if (history.value === 40) {
        //Заказ отправлен курьером
       console.log('Курьер');
       changeOrderByTransaction(req, res, next, 'delivery_start').then((order) => sendPushOrders(`Заказ №${order.incoming_order_id} отправлен`, 'Ваш заказ был передан курьеру. Ожидайте', order,  'push_delivery', pushOrderSend));
      } else if (history.value === 50) {
        //Заказ доставлен
       changeOrderByTransaction(req, res, next, 'delivery_end').then(() => console.log('Заказ доставлен'))
      } else {
       res.send({
         data: {
           msg: 'Success'
         }
       })
     }
    } else {
      res.send({
        data: {
          msg: 'Success'
        }
      })
    }
  } else if (body.object === 'product') {
    if (hook_action === 'added') {
      productCreate(req, res, next).then()
    } else if (hook_action === 'changed') {
      productChange(req, res, next).then()
    } else if (hook_action === 'removed') {
      productDelete(req, res, next).then()
    }
  } else if (body.object === 'category') {
    if (hook_action === 'added') {
      categoriesCreate(req, res, next).then()
    } else if (hook_action === 'changed') {
      categoriesChange(req, res, next).then()
    } else if (hook_action === 'removed') {
      categoryDelete(req, res, next).then()
    }
  } else {
    res.send({
      data: {
        msg: 'Вызван хук, но обработчик еще не написан'
      }
    })
  }
}));

module.exports = hooksRouter;
