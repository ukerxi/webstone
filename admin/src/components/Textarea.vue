<template>
  <div class="view-component">
    <span class="item-title">{{view_control.title}}：</span>
    <div class="item-content">
      <el-input v-model="text" type="textarea" :rows="view_control.rows" clearable placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wsTextarea',
    props: ['viewData', 'viewControl'],
    data() {
      return {
        text: '',
        view_control:{
          title: '标题',
          // 默认配置参数，可通过 setControl 属性传进来
          rows: 6
        }
      }
    },
    watch: {
      text: function (newVal, oldVal) {
        // 触发父组件数据变更
        this.triggerData(newVal)
      }
    },
    created() {
      var _self = this
      // 赋初值
      _self.text = _self.viewData || ''
      if (_self.viewControl && _self.viewControl.rows) {
        _self.view_control.rows = _self.viewControl.rows
      }
      if (_self.viewControl && _self.viewControl.title) {
        _self.view_control.title = _self.viewControl.title
      }
    },
    methods: {
      triggerData(data) {
        var _self = this
        _self.$emit('update', data)
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
      vertical-align: middle;
    }
    .item-content {
      position: relative;
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
