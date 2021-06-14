const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrdersSchema = new mongoose.Schema({
  incoming_order_id: {
    type: Number,
  },
  type: {
    type: Number
  },
  spot_id: {
    type: Number
  },
  status: {
    type: Number
  },
  client_id: {
    type: Number
  },
  client_address_id: {
    type: Number
  },
  table_id: {
    type: Number
  },
  comment: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  sex: {
    type: Number
  },
  birthday: {
    type: String
  },
  address: {
    type: String
  },
  comment: {
    type: String
  },
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  transaction_id: {
    type: Number
  },
  service_mode: {
    type: Number
  },
  products: [],
  delivery_price: {
    type: String
  },
  fiscal_spreading: {
    type: Number
  },
  fiscal_method: {
    type: String
  },
  promotion: {
    type: String
  },
  delivery_time: {
    type: String
  },
  payment_method_id: {
    type: Number
  },
  text_status: {
    type: String
  }
});

OrdersSchema.plugin(AutoIncrement, {id: 'Orders', inc_field: 'id'});

module.exports = mongoose.model('Orders', OrdersSchema);
