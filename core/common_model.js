/**
 * 通用 model 主要用以初始化时进行统一参数配置
 * @param {object} 初始化参数
 * @return {object} 返回实例结果 schema 实例 / model
 * */
const _ = require('lodash');
const mongoose = require('./db.js');
const Types = require('./model_types');
module.exports = function (param) {
  let _res = {
    name: '',
    schema: '',
    model: '',
    origin: '' // 原始初始化数据
  };
  _res.origin = _.merge({}, param);
  if (mongoose) {
    _.forEach(param.data, function (item, ) {
      // 根据传过来的类型进行初始化数据库
      if ([Types.Text, Types.Textarea, Types.Password, Types.Html, Types.Color, Types.Image].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['String'];
      } else if ([Types.Number, Types.Datetime].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['Number'];
      } else if ([Types.Images].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['Array'];
      } else if ([Types.Boolean].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['Boolean'];
      } else if ([Types.Date].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['Date'];
      }
    });
    // 添加更新日期字段
    if (!param.update) {
      param.update = {type: 'Date', default: Date.now}
    }
    _res.schema = new mongoose.Schema(param.data);
    _res.model = mongoose.model(param.name, _res.schema)
  }
  return _res
};
