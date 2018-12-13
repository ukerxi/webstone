/**
 * @name upload 文件上传
 * */
const multer = require('multer');
const _ = require('lodash');
const getResFormat = require('../core/common').getResFormat;
// 图片文件
const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload_files/images')
  },
  filename: function (req, file, cb) {
    let fileName = (file.originalname || '').split('.');
    let date = new Date();
    const month = date.getMonth() + 1;
    let dateStr = '' + date.getFullYear() + (month >9 ? month : ('0' + month)) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
    cb(null, fileName[0] + '_' + dateStr + '.' + fileName[1])
  }
});
// 其他文件
const storageFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload_files/files')
  },
  filename: function (req, file, cb) {
    let fileName = (file.originalname || '').split('.');
    let date = new Date();
    const month = date.getMonth() + 1;
    let dateStr = '' + date.getFullYear() + (month >9 ? month : ('0' + month)) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
    cb(null, fileName[0] + '-' + dateStr + '.' + fileName[1])
  }
});
const uploadFiles = multer({storage: storageFiles});
const uploadImages = multer({storage: storageImages});

// 导出
module.exports = function (app) {
  app.post('/upload/images', uploadImages.fields([{name: 'image', maxCount: 1}, {name: 'images', maxCount: 3}]), function (req, res, next) {
    const resData = getResFormat();
    // req.files['name'] Array
    // req.body will contain the text fields
    if (req.files) {
      if (req.files['image'] && req.files['image'].length > 0) {
        _.each(req.files['image'], function (item) {
          resData.data['image'] = {
            filename: item.filename,
            fieldname: item.fieldname,
            originalname: item.originalname,
            encoding: item.encoding,
            size: item.size,
            path: item.path,
            destination: item.destination,
          }
        });
      }
      if (req.files['images'] && req.files['images'].length > 0) {
        resData.data['images'] = [];
        _.each(req.files['images'], function (item) {
          resData.data['images'].push({
            filename: item.filename,
            fieldname: item.fieldname,
            originalname: item.originalname,
            encoding: item.encoding,
            size: item.size,
            path: item.path,
            destination: item.destination,
          });
        })
      }
      resData.code = '0000';
      resData.info = '上传成功';
    } else {
      resData.code = '1001';
      resData.info = '上传失败';
    }
    res.send(resData);
  });
  app.post('/upload/files', uploadFiles.fields([{name: 'file', maxCount: 1}, {name: 'files', maxCount: 3}]), function (req, res, next) {
    const resData = getResFormat();
    if (req.files) {
      if (req.files['file'].length > 0) {
        _.each(req.files['file'], function (item) {
          resData.data['file'] = {
            filename: item.filename,
            fieldname: item.fieldname,
            originalname: item.originalname,
            encoding: item.encoding,
            size: item.size,
            path: item.path,
            destination: item.destination,
          }
        });
      }
      if (req.files['files'].length > 0) {
        resData.data['files'] = [];
        _.each(req.files['files'], function (item) {
          resData.data['files'].push({
            filename: item.filename,
            fieldname: item.fieldname,
            originalname: item.originalname,
            encoding: item.encoding,
            size: item.size,
            path: item.path,
            destination: item.destination,
          });
        })
      }
      resData.code = '0000';
      resData.info = '上传成功';
    } else {
      resData.code = '1001';
      resData.info = '上传失败';
    }
    res.send(resData);
  });
};
