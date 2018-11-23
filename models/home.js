/**
 * @name home model
 * */
const mongoose = require('../core/db');
let _model = {
  name: 'home',
  schema: '',
  exp: ''
};
if (mongoose) {
  _model.schema = new mongoose.Schema({
    name: {type: String},
    text: {type: String},
    updated: {type: Date, default: Date.now}
  });
  _model.exp = mongoose.model(_model.name, _model.schema)
}

module.exports = _model.exp;
