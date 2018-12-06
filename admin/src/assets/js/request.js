/**
 *  @name Request 前端请求插件
 * */
import axios from 'axios'
function Request() {
  this.name = 'axios';
  this.version = '0.18.0';
  // 定义 axios 后续可以根据自己的需求进行不同的插件引入
  this.axios = function (param) {
    let _param = param || {};
    axios({
      method: _param.method || 'post',
      url: _param.url,
      data: _param.data || {},
      params: _param.params || {},
    }).then(function (response) {
      if (typeof _param.callback === 'function') {
        _param.callback(response.data);
      }
    }).catch(function (error) {
      if (typeof _param.errorCallback === 'function') {
        _param.errorCallback(error);
      }
    });
  }
}

Request.prototype.get = function (param) {
  // 定义get请求
  let _param = param || {};
  _param.method = 'get';
  _param.params = _param.data || {};
  _param.data = {};
  this.axios(_param);
};

Request.prototype.post = function (param) {
  // 定义post请求
  let _param = param || {};
  _param.method = 'post';
  this.axios(_param);
};

// 导出
export default new Request()
