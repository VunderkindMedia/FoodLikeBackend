const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SettingSchema = new mongoose.Schema({
  bannerList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Images',
  }],
});

SettingSchema.plugin(AutoIncrement, {id: 'Settings', inc_field: 'id'});

module.exports = mongoose.model('Settings', SettingSchema);
