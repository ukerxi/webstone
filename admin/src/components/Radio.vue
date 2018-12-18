<template>
  <div class="view-component">
    <span class="item-title">{{view_control.title}}：</span>
    <div class="item-content">
      <template v-if="view_control.list && view_control.list.length >0">
        <el-radio v-for="(item, key) in view_control.list" v-model="val" :key="key" :label="item.val">{{item.text}}</el-radio>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wsRadio',
    props: ['viewData', 'viewControl'],
    data() {
      return {
        val: '',
        view_control: {
          title: '是否显示',
          list: [{
            val: '1',
            text: '是'
          }, {
            val: '0',
            text: '否'
          }]
        }
      }
    },
    watch: {
      val: function (newVal, oldVal) {
        // 触发父组件数据变更
        this.triggerData(newVal)
      }
    },
    created() {
      var _self = this;
      // 赋初值
      _self.val = _self.viewData;
      if (_self.viewControl && _self.viewControl.title) {
        _self.view_control.title = _self.viewControl.title
      }
      if (_self.viewControl && _self.viewControl.list) {
        _self.view_control.list = _self.viewControl.list
      }
    },
    methods: {
      triggerData(data) {
        var _self = this
        _self.$emit('update', data, )
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
