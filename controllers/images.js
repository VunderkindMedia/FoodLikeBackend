const {isEmpty} = require('../helpers/insruments');
const { Images } = require('../models');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const imageUpoload = async (req, res, next) => {
  const data = req.file;
  console.log(data);
      Images.create({
        name: data.originalname,
        src: '/api/uploads/' + data.filename,
        uid: req.body.uid,
      })
      .then((image) => res.send({ data: image }))
      .catch((err) => res.send({ error: err.message }))
      .catch(next);
};

const imageSave = async (req, res, next) => {
  const body = req.body;
  console.log('body', body);
  Images.findOneAndUpdate({id: body.id}, body.data)
  .then(image => res.send({data: image}))
  .catch((err) => res.send({ error: err.message }))
  .catch(next);
}

const imagesGet = async (req, res, next) => {
  const data = req.query;
    Images.find(data)
    .then((images)=> {
      images = images.filter(image => {
        console.log(moment(image.start_date));
        console.log(moment())
        if (image.start_date && moment(image.start_date).isBefore(moment()) && moment(image.end_date).isAfter(moment())) {
          image.show = true
          return image
        } else {
          image.show = false
          return image
        }
      })
      res.send({ data: images })
    })
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
}

const imageGet = async (req, res, next) => {
  res.sendFile(path.join(__dirname, "../uploads/" + req.params[0]));
}

const imageRemove = async (req, res, next) => {
  if (req.query && req.query.uid) {

    Images.findOneAndRemove({ uid: req.query.uid }).then(result => {

      if (result && result.src) {
        fs.unlink(path.parse(require.main.filename).dir + result.src.replace('/api', ''), (err) => {
          if (err) {
            console.log(err);
            res.send({
              data: result

            })
          } else {
            res.send({
              data: result

            })
          }
        })
      } else {
        res.status(404).send({
          error: 'Файл отсутствует'
        })
      }

    })
  } else {
    res.status(404).send({
      error: 'uid - обязательный параметр не передан'
    })
  }

}

module.exports = {
  imageUpoload, imagesGet, imageGet, imageRemove, imageSave
};
