<template>
  <div class="view-component">
    <span class="item-title">{{view_control.title}}：</span>
    <div class="item-content">
      <el-upload
        name="file"
        class="item-upload"
        :action="action"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :multiple = "true"
        :limit="view_control.limit"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wsImages',
    props: ['viewData', 'viewControl'],
    data() {
      return {
        fileList: [{name: '', url: ''}],
        action: '/upload/files',
        view_control:{
          // 默认配置参数，可通过 view_control 属性传进来
          title: '上传文件列表',
          limit: 3,
          dataType: 'list' // 控制返回数据的类型，object 针对单个文件， list 针对列表文件
        }
      }
    },
    watch: {
      fileList: function (newVal, oldVal) {
        var _self = this;
        newVal = newVal || [];
        // 触发父组件数据变更
        if (_self.view_control.dataType === 'list') {
          _self.triggerData(newVal)
        } else {
          _self.triggerData(newVal[0] || {})
        }
      }
    },
    created() {
      var _self = this;
      if (_self.viewControl && _self.viewControl.limit) {
        _self.view_control.rows = _self.viewControl.limit
      }
      if (_self.viewControl && _self.viewControl.title) {
        _self.view_control.title = _self.viewControl.title
      }
      if (_self.viewControl && _self.viewControl.dataType) {
        _self.view_control.dataType = _self.viewControl.dataType
      }
      // 赋初值
      if (_self.view_control.dataType === 'list') {
        _self.fileList = _self.viewData || '';
      } else {
        _self.fileList = [];
        if (_self.viewData) {
          _self.fileList.push(_self.viewData);
        }
      }
    },
    methods: {
      triggerData(data) {
        var _self = this;
        _self.$emit('update', data)
      },
      handleSuccess(response, file, fileList) {
        var _self = this;
        _self.fileList = [];
        if (response.code === '0000') {
          if (fileList && fileList.length >0) {
            for(var i = 0; i < fileList.length; i++) {
              if (fileList[i].response && fileList[i].response.data.file) {
                _self.fileList.push(fileList[i].response.data.file);
              } else {
                _self.fileList.push(fileList[i]);
              }
            }
          }
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${Files.length} 个文件，共选择了 ${Files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style lang="less" scoped>
  .view-component {
    position: relative;
    margin: 0;
    padding: 0;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    width: 100%;
    .item-title {
      position: relative;
      display: inline-block;
      vertical-align: top;
      line-height: 32px;
    }
    .item-content {
      position: relative;
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
