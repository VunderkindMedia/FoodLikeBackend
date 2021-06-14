const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ClientsSchema = new mongoose.Schema({
  // client_id: {
  //   type: String,
  //   minlength: 1,
  //   required: true
  // },
  token: {
    type: String,
    required: true,
  },
  client_phone: {
    type: String,
    minlength: 12,
    maxlength: 12,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
});

ClientsSchema.plugin(AutoIncrement, {id: 'Clients', inc_field: 'id'});

module.exports = mongoose.model('Clients', ClientsSchema);
