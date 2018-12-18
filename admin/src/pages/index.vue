<template>
  <div class="view-page-index">
    <div class="wrap-view-item" v-if="view_data.title">
      <ws-view :view-data="view_data.title" :view-control="setControl('title')"></ws-view>
    </div>
    <div class="wrap-view-item" v-if="view_data.notice">
      <ws-view :view-data="view_data.notice" :view-control="setControl('notice')"></ws-view>
    </div>
    <div class="wrap-view-item" v-if="view_data.isShow">
      <ws-view :view-data="view_data.isShow" :view-control="setControl('isShow')"></ws-view>
    </div>
    <div class="wrap-view-item" v-if="view_data.showTime">
      <ws-view :view-data="view_data.showTime" :view-control="setControl('showTime')"></ws-view>
    </div>
    <div class="wrap-view-item" v-if="view_data.banners">
      <ws-view :view-data="view_data.banners" :view-control="setControl('banners')"></ws-view>
    </div>
    <div class="wrap-view-item" v-if="view_data.backgroundColor">
      <ws-view :view-data="view_data.backgroundColor" :view-control="setControl('backgroundColor')"></ws-view>
    </div>
    <div class="wrap-view-item" v-if="view_data.remark">
      <ws-view :view-data="view_data.remark" :view-control="setControl('remark')"></ws-view>
    </div>
    <el-button type="primary" @click="saveData">添加数据</el-button>
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
        view_data: {}
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList() {
        var _self = this;
        request.get({
          // url: '/api/home/getById',
          url: '/api/home/getDataKey',
          data: {
            isFormat: '1',
            id: '5c13270c970fe62064048a42'
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
          url: '/api/home/add',
          data: _params,
          callback: function (res) {
            console.log(res)
          }
        })
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
  }
</style>
