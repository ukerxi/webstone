<template>
  <div class="view-page-index">
    <template v-for="(item, key) in key_list">
      <div class="wrap-view-item" v-if="setData(item)">
        <ws-view :view-data="setData(item)" :view-control="setControl(item)"></ws-view>
      </div>
    </template>
    <div class="wrap-view-item add-padding-top">
      <el-button type="primary" @click="saveData">保存数据</el-button>
    </div>
  </div>
</template>

<script>
  import TypeView from '../components/TypeView.vue'
  import request from '../assets/js/request.js'
  import {getViewData} from '../assets/js/utils.js'
  export default {
    name: 'Index',
    components: {
      wsView: TypeView
    },
    data() {
      return {
        view_data: {},
        key_list: ['title', 'notice', 'isShow', 'showTime', 'banners', 'backgroundColor', 'remark'], // 定义渲染列表的字段，决定了渲染顺序
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList() {
        var _self = this;
        request.get({
          url: '/api/home/getOne',
          data: {
            isFormat: '1'
          },
          callback: function (res) {
            if (res.code === '0000') {
              _self.view_data = res.data || {}
            }
          }
        })
      },
      saveData() {
        var _self = this;
        var _params = getViewData(_self.view_data || {});
        request.post({
          url: '/api/home/update',
          data: _params,
          callback: function (res) {
            console.log(res)
          }
        })
      },
      setData(key) {
        // 渲染数据
        var _self = this;
        return _self.view_data[key]
      },
      setControl(key) {
        // 设置组件控制配置
        var _control = {};
        var item = this.view_data[key] || {};
        if (item.type === 'Radio') {
          _control.list = [{
            val: '1',
            text: '发布'
          }, {
            val: '0',
            text: '不发布'
          }, {
            val: '-1',
            text: '待发布'
          }];
        }
        return _control
      }
    }
  }
</script>

<style lang="less" scoped>
  .view-page-index {
    position: relative;
    .wrap-view-item {
      position: relative;
      margin: 10px 0 10px 10px;
    }
    .view-center {
      text-align: center;
    }
    .add-padding-top {
      padding-top: 20px;
    }
  }
</style>
