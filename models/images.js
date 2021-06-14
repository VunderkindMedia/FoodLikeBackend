const mongoose = require('mongoose');
const moment = require('moment');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    required: true
  },
  src: {
    type: String,
    minlength: 1,
    required: true
  },
  upload_date: {
    type: Date,
    default: new Date()
  },
  start_date: {
    type: String,
    default: moment().format()
  },
  end_date: {
    type: String,
    default: moment().add(14, 'days').format()
  },
  adsURL: {
    type: String,
    default: ''
  },
  uid: {
    type: String,
    required: true
  }
});

ImageSchema.plugin(AutoIncrement, {id: 'Images', inc_field: 'id'});

module.exports = mongoose.model('Image', ImageSchema);
