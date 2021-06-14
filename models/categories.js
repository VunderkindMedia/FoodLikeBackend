const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CategoriesSchema = new mongoose.Schema({
  "category_id":Number,
  "category_name":String,
  "category_photo":String,
  "category_photo_origin":String,
  "parent_category":Number,
  "category_color":String,
  "category_hidden":Number,
  "sort_order":Number,
  "fiscal":Number,
  "nodiscount":Number,
  "tax_id":Number,
  "left":Number,
  "right":Number,
  "level":Number,
  "category_tag":String,
  "visible":Array,
  "id_1c":String
});

CategoriesSchema.plugin(AutoIncrement, {id: 'Categories', inc_field: 'id'});

module.exports = mongoose.model('Categories', CategoriesSchema);
