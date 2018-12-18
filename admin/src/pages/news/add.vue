<template>
  <div class="view-page-index">
    <template v-for="(item, key) in view_data">
      <ws-view v-if="item.type" :key="key" :view-data="item" :view-control="setControl(key, item.type)"></ws-view>
    </template>
    <el-button type="primary" @click="saveData">添加数据</el-button>
  </div>
</template>

<script>
  import TypeView from '../../components/TypeView.vue'
  import request from '../../assets/js/request.js'
  import {getViewData} from '../../assets/js/utils.js'
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
      setControl(key, type) {
        // 设置组件控制配置
        var _control = {}
        if (type === 'Radio') {
          _control = {
            title: '是否发布',
            list: [{
              val: '1',
              text: '发布'
            }, {
              val: '0',
              text: '不发布'
            }, {
              val: '-1',
              text: '待发布'
            }]
          }
        }
        return _control
      }
    }
  }
</script>

<style scoped>
  .view-page-index {
    position: relative;
  }
</style>
