/**
 * @name home model
 * */
const initModel = require('../core/common_model');
const Types = require('../core/model_types');
let _model = initModel({
  name: 'home',
  data: {
    name: {type: Types.Text},
    text: {type: Types.Text},
    isShow: {type: Types.Radio, default: '1'},
    updated: {type: Types.Date, default: Date.now}
  }
});
module.exports = _model;
