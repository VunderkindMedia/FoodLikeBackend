const {isEmpty} = require('../helpers/insruments');
const { Clients } = require('../models');

const clientCreate = async (req, res, next) => {
  const date = req.query;
  date.will_rewrite = true;
  let isUser = await Clients.findOne({'client_phone': date.client_phone});
  if (date.will_rewrite) {
    if (!isUser) {
      Clients.create(date)
      .then((user) => res.send({ data: user }))
      .catch((err) => res.send({ error: err.message }))
      .catch(next);
    } else {
      Clients.findOneAndUpdate(
          {'client_phone': date.client_phone},
          { 'token': date.token, 'os': date.os}, { runValidators: true },
          (err, result) => res.send({
            data: {
              msg: 'Client is updated!',
              phone: date.client_phone,
              token: date.token,
              os: date.os
            }})
      )
      .catch((err) => res.send({ error: err.message }))
      .catch(next);
    }
  } else {
    if (!user) {
      Clients.create(date)
      .then((user) => res.send({ data: user }))
      .catch((err) => res.send({ error: err.message }))
      .catch(next);
    } else {
      res.send({ error: 'Пользователь с таким номером уже существует' });
    }
  }

};

const clientGet = async (req, res, next) => {
  const date = req.query;
  if (!isEmpty(date)) {
    Clients.find(date)
    .then((client)=> res.send({ data: client }))
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
  } else {
    console.log(Clients);
    Clients.find()
    .then((clients)=> res.send({ data: clients }))
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
  }

}

module.exports = {
  clientCreate, clientGet
};
