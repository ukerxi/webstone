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
    showDate: {type: Types.Date, default: Date.now},
    showTime: {type: Types.DateTime, default: Date.now},
    images: {type: Types.Images, default: []},
    image: {type: Types.Image, default: ''},
    files: {type: Types.Files, default: []},
    file: {type: Types.File, default: ''},
    html: {type: Types.Html, default: ''},
    updateTime: {type: Types.Date, default: Date.now}
  }
});
module.exports = _model;
