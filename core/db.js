/**
 * @name 数据库连接
 * */
const _conf = require('../webstone.js');
const mongoose = require('mongoose');
let exMongoose = '';
if (_conf.mongo_config && _conf.mongo_config.is_connect) {
  // 根据配置进行设置数据库连接
  // 链接数据库
  exMongoose = mongoose;
  exMongoose.connect(_conf.mongo_config.url, {useNewUrlParser: true});
  // 事件监听
  exMongoose.connection.on('connected', function () {
    console.log('Mongoose open ' + _conf.mongo_config.url);
  });
  exMongoose.connection.on('error', function (err) {
    console.log('Mongoose  error: ' + err);
  });
  exMongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });
}
module.exports = exMongoose;
