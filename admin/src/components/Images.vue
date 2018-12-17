<template>
  <div class="view-component">
    <span class="item-title">{{view_control.title}}：</span>
    <div class="item-content">
      <el-upload
        name="image"
        class="item-upload"
        :action="action"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :multiple = "true"
        :limit="view_control.limit"
        :on-exceed="handleExceed"
        list-type="picture"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
        action: '/upload/images',
        view_control:{
          // 默认配置参数，可通过 view_control 属性传进来
          title: '上传图片列表',
          limit: 3
        }
      }
    },
    watch: {
      fileList: function (newVal, oldVal) {
        // 触发父组件数据变更
        this.triggerData(newVal)
      }
    },
    created() {
      var _self = this
      // 赋初值
      _self.fileList = _self.viewData || ''
      if (_self.viewControl && _self.viewControl.limit) {
        _self.view_control.rows = _self.viewControl.limit
      }
      if (_self.viewControl && _self.viewControl.title) {
        _self.view_control.title = _self.viewControl.title
      }
    },
    methods: {
      triggerData(data) {
        var _self = this
        _self.$emit('update', data)
      },
      handleSuccess(response, file, fileList) {
        var _self = this
        _self.fileList = [];
        if (response.code === '0000') {
          if (fileList && fileList.length >0) {
            for(var i = 0; i < fileList.length; i++) {
              if (fileList[i].response && fileList[i].response.data.image) {
                _self.fileList.push(fileList[i].response.data.image);
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
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
