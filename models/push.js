const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PushSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  description: {
    type: String,
    minlength: 1,
    required: true
  },
  send_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
    required: true
  },
  send_date: {
    type: Date,
    default: new Date()
  }
});

PushSchema.plugin(AutoIncrement, {id: 'Push', inc_field: 'id'});

module.exports = mongoose.model('Push', PushSchema);
