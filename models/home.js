/**
 * @name home model
 * */
const initModel = require('../core/common_model');
const Types = require('../core/model_types');
let _model = initModel({
  name: 'home',
  data: {
    title: {type: Types.Text, default: '1', label: '标题'},
    notice: {type: Types.Textarea, default: '1', label: '公告'},
    isShow: {type: Types.Radio, default: '1', label: '是否显示公告'},
    showTime: {type: Types.DateTime, default: Date.now, label: '显示时间'},
    banners: {type: Types.Images, default: [], label: 'banners'},
    backgroundColor: {type: Types.ColorPicker, default: '', label: '背景颜色控制'},
    remark: {type: Types.Text, default: '1', label: '备注'},
  }
});
module.exports = _model;
