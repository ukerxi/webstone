/**
 * 封装ajax函数
 * @depend jquery.js
 * */
(function ($) {
  $.controlCon = (function () {
    // 防止重复发送请求
    let _remoteCallPreventReCommit = {};
    // 发送ajax请求
    function _ajax(newConfig, callback, commitType, errorHandler, beforeHandler) {
      let handler = {
        beforeSend: function () {
          if (typeof(beforeHandler) === 'function') {
            beforeHandler();
          }
        },
        success: function (data) {
          _DeleteCommitTypeAfterCallback(callback, commitType, data);
        },
        error: function () {
          _DeleteCommitTypeAfterCallback(errorHandler, commitType);
        }
      };
      newConfig = $.extend(handler, newConfig);
      $.ajax(newConfig);
    }

    // 无论请求结果如何，一旦服务器响应必须清除请求状态
    function _DeleteCommitTypeAfterCallback(callback, commitType, data) {
      // 先执行回调函数，如果没有定义不执行
      if (typeof(callback) === 'function') {
        callback(data);
      }

      // 回调完毕，销毁代表本次请求的提交状态
      delete _remoteCallPreventReCommit[commitType];
    }

    return {
      remoteCall: function (jsonBody, callback, errorHandler, beforeHandler) {
        let _url = jsonBody.url;
        let defaultConfig = {
          type: 'POST',
          dataType: 'json',
          contentType: 'application/x-www-form-urlencoded; charset=utf-8',
          timeout: 300000
        };
        // 覆盖默认设置
        let newConfig = $.extend(defaultConfig, jsonBody);
        // 兼容服务器获取params的值
        if (newConfig.type === 'POST') {
          newConfig.params = newConfig.data;
        }
        // 校验url和action是否漏掉
        if (!_url) {
          return false;
        }

        let commitType = _url;
        if (_remoteCallPreventReCommit[commitType]) {
          // 请求正在发送中，请勿重复操作
          return false;
        } else {
          // 将请求状态置为正在发送中
          _remoteCallPreventReCommit[commitType] = 1;
          // 自动加上属性 "_"
          if (newConfig.data) {
            if (!newConfig.data.hasOwnProperty('_')) {
              newConfig.data._ = new Date().getTime();
            }
          } else {
            newConfig.data = {
              _: new Date().getTime()
            }
          }
          // 发送请求，回调成功后必须将请求状态清除
          _ajax(newConfig, callback, commitType, errorHandler, beforeHandler);
        }
      }
    }
  })();
})(window.Zepto || window.jQuery);
