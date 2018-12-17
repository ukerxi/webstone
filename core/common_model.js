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
    schema: {},
    model: {},
    origin: {} // 原始初始化数据
  };
  _res.origin = _.merge({}, param);
  if (mongoose) {
    _.forEach(param.data, function (item, ) {
      // 根据传过来的类型进行初始化数据库
      if ([Types.Text, Types.Textarea, Types.Password, Types.Html, Types.Color, Types.Image, Types.Radio].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['String'];
      } else if ([Types.Number, Types.Datetime].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['Number'];
      } else if ([Types.Images, Types.Files, Types.Image, Types.File].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['Mixed'];
      } else if ([Types.Boolean].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['Boolean'];
      } else if ([Types.Date, Types.DateTime].indexOf(item.type) !== -1) {
        item.type = mongoose.Schema.Types['Date'];
      }
    });
    if (!param.data.index) {
      // 添加index 字段
      param.data.index = {type: 'String', index: true, unique: true}
    }
    if (!param.data.updateTime) {
      // 添加更新日期字段
      param.data.updateTime = {type: 'Date', default: Date.now}
    }
    if (!param.data.createTime) {
      // 添加创建日期字段
      param.data.createTime = {type: 'Date', default: Date.now}
    }
    if (!param.data.flag) {
      // 添加删除标志 1 "正常"、0 "删除", 软删除操作
      param.data.flag = {type: 'Number', default: 1}
    }
    _res.schema = new mongoose.Schema(param.data);
    _res.model = mongoose.model(param.name, _res.schema)
  } else {
    console.log('error：mongod 数据库未开启！')
  }
  return _res
};
