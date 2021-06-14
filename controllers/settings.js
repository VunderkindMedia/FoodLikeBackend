const {isEmpty} = require('../helpers/insruments');
const { Settings, Images } = require('../models');
const path = require('path');
const fs = require('fs');
const {config} = require('../helpers/insruments');


const createSettings = async (req, res, next) => {
  Settings.create({
    app_main_title: 'доДома',
  }).then(doc => {
    res.send({
      data: doc
    })
  })
}

const changeSettings = async (req, res, next) => {
  const date = req.query;
      Settings.findOneAndUpdate({"id": 1}, date)
      .then(() => Settings.findOne({"id": 1}).then(doc => {
        Images.find().then(docs => {
          res.send({ data: {...doc._doc, bannerList: docs}})
        })
      }))
      .catch((err) => res.send({ error: err.message }))
      .catch(next);
};

const changeLocalConfig = async (req,res,next) => {
  const body = req.query;
    config.get().then((result) => {
      console.log(result);
      Object.keys(body).map((item) => {
        if (item in result) {
          result[item] = body[item];
        }
      })
      const configStringify = JSON.stringify(result);
      config.write(configStringify).then(() => {
          res.send({
            data: result
          })
      })
    })
}

const getLocalConfig = (req, res, next) => {
  config.get().then(config => {
    res.send({
      data: config
    })
  })
}

const getSettings = async (req, res, next) => {
  config.get().then(config => {
    Settings.findOne({"id": 1})
    .then((doc)=> {
      Images.find().then(docs => {
        res.send({ data: {...doc._doc, bannerList: docs, ...config }})
      })
    })
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
  });
}

module.exports = {
  changeSettings, getSettings, createSettings, changeLocalConfig, getLocalConfig
};
