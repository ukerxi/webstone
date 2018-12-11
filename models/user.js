/**
 * @name home model
 * */
const initModel = require('../core/common_model');
const Types = require('../core/model_types');
let _model = initModel({
  name: 'user',
  data: {
    account: {type: Types.Text}, // 账户
    password: {type: Types.Text, default: '123456'}, // 密码
    phone: {type: Types.Text, default: ''}, // 用于绑定手机
    remark: {type: Types.Text, default: ''}, // 备注
    type: {type: Types.Text, default: ''}, // 类型，用于权限控制，登录前台，后台
    updateTime: {type: Types.Date, default: Date.now}
  }
});
module.exports = _model;
