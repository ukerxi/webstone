<template>
  <div class="view-component">
    <span class="item-title">{{view_control.title}}：</span>
    <div class="item-content">
      <el-date-picker v-model="val" type="date" value-format="timestamp" placeholder="选择日期"></el-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wsDate',
    props: ['viewData', 'viewControl'],
    data() {
      return {
        val: '',
        view_control: {
          title: '选择日期'
        }
      }
    },
    watch: {
      val: function (newVal, oldVal) {
        // 触发父组件数据变更
        newVal = newVal || ''
        this.triggerData(newVal)
      }
    },
    created() {
      var _self = this
      // 赋初值
      _self.val = parseInt(_self.viewData) || Date.now()
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
