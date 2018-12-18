/**
 * @name home model
 * */
const initModel = require('../core/common_model');
const Types = require('../core/model_types');
let _model = initModel({
  name: 'user',
  data: {
    account: {type: Types.Text, label: '账户'},
    password: {type: Types.Text, default: '123456', label: '密码'},
    phone: {type: Types.Text, default: '', label: '手机'},
    remark: {type: Types.Text, default: '', label: '备注'},
    type: {type: Types.Text, default: '', label: '类型'},
    updateTime: {type: Types.Date, default: Date.now, label: '更新时间'}
  }
});
module.exports = _model;
