const express = require('express');
const {
  imageUpoload, imagesGet, imageRemove, imageSave
} = require('../controllers');


const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg') {
      cb(null, Date.now() + '.jpg')
    } else if (file.mimetype === 'image/png') {
      cb(null, Date.now() + '.png')
    }
  }
})
const upload = multer({ storage: storage, preservePath: true })

const imagesRouter = express.Router();

imagesRouter.post('/upload', upload.single('file'),  imageUpoload);
imagesRouter.get('/get', imagesGet);
imagesRouter.get('/remove', imageRemove);
imagesRouter.post('/save', imageSave);

module.exports = imagesRouter;
