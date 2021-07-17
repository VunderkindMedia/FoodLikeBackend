const {sendPushApi} = require('../api/sendPushApi');
const {isEmpty} = require('../helpers/insruments');
const { Push, Clients } = require('../models');

const pushSend = async (req, res, next) => {
  const data = req.body;

  if (!data || (!data && !data.users_list)) {
    res.send({error: {
      msg: 'Не указан список пользователей для отправки уведомления'
      }})
  } else {
    sendPushApi(data).then(result => {
      res.send({ response: {
          msg: 'Отправлено',
          push_count: data.users_list.length,
          send_to: data.users_list
        }})
    })
  }
};

const pushOrderSend = async (phone, title, description) => {

  Clients.find({"client_phone": ` ${phone.match(/\d+/)[0]}`}, (err, doc) => {
    if (doc) {
      sendPushApi({title: title, description: description, users_list: doc}).then((result) => {
        console.log(result);
      })
    }
  })
}

const pushGet = async (req, res, next) => {
  const date = req.query;
  if (!isEmpty(date)) {
    Push.find(date).
        then((push) => res.send({data: push})).
        catch((err) => res.send({error: err.message})).
        catch(next);
  } else {
    Push.find().
        then((pushes) => res.send({data: pushes})).
        catch((err) => res.send({error: err.message})).
        catch(next);
  }
}

module.exports = {
  pushSend, pushGet, pushOrderSend
}

