<template>
  <div class="view-page-index">
    <template v-for="(item, key) in view_data">
      <ws-view v-if="item.type" :key="key" :view-data="item" :view-control="setControl(key, item.type)"></ws-view>
    </template>
  </div>
</template>

<script>
  import TypeView from '../components/TypeView.vue'
  import request from '../assets/js/request.js'
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
      getList () {
        var _self = this
        request.get({
          url: '/api/home/getById',
          data: {
            isFormat: '1',
            id: '5c08d0526a88381620ffbcc9'
          },
          callback: function (res) {
            if (res.code === '0000') {
              _self.view_data = res.data || {}
            }
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
              text: '布发布'
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
