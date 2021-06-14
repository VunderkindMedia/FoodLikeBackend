const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductsSchema = new mongoose.Schema({
  barcode:String,
  category_name:String,
  unit:String,
  cost:String,
  cost_netto:String,
  fiscal:String,
  hidden:String,
  menu_category_id:String,
  workshop:String,
  nodiscount:String,
  photo:String,
  product_code:String,
  price: Object,
  product_id: {
    type: String,
    unique: true
  },
  product_name: {
    type: String,
    unique: true
  },
  sort_order:String,
  tax_id:String,
  product_tax_id:String,
  type:String,
  weight_flag:String,
  color:String,
  spots:Array,
  ingredient_id:String,
  cooking_time: String,
  fiscal_code: String,
  out:String,
  description: {
    type: String,
    default: 'Описание отсутствует'
  },
  weight: {
    type:String,
    default: "Не указано/200"
  }
});

ProductsSchema.plugin(AutoIncrement, {id: 'Products', inc_field: 'id'});

module.exports = mongoose.model('Products', ProductsSchema);
