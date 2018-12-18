<template>
  <div class="view-component">
    <span class="item-title">{{view_control.title}}：</span>
    <div class="item-content">
      <el-color-picker v-model="color" popper-class="wrap-color-picker" :disabled="view_control.disabled" :predefine="view_control.predefineColors" :show-alpha="view_control.alpha" :size="view_control.size"></el-color-picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wsText',
    props: ['viewData', 'viewControl'],
    data() {
      return {
        color: '',
        view_control:{
          title: '颜色选择器',
          alpha: false, // 是否开启透明度选择
          size: 'medium', // 颜色选择按钮的大小 medium / small / mini
          disabled: false, // 是否禁用
          predefineColors: [  // 预定义颜色
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
          ],
        }
      }
    },
    watch: {
      color: function (newVal, oldVal) {
        // 触发父组件数据变更
        this.triggerData(newVal)
      }
    },
    created() {
      var _self = this
      // 赋初值
      _self.color = _self.viewData || '';
      if (_self.viewControl) {
        if (_self.viewControl.title) {
          _self.view_control.title = _self.viewControl.title
        }
        if (_self.viewControl.alpha) {
          _self.view_control.alpha = _self.viewControl.alpha
        }
        if (_self.viewControl.size) {
          _self.view_control.size = _self.viewControl.size
        }
        if (_self.viewControl.disabled) {
          _self.view_control.disabled = _self.viewControl.disabled
        }
        if (_self.viewControl.predefineColors) {
          _self.view_control.predefineColors = _self.viewControl.predefineColors
        }
      }
    },
    methods: {
      triggerData(data) {
        var _self = this;
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
