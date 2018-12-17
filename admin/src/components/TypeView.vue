<template>
  <div class="view-component">
    <template v-if="view_data.type === 'Text'">
      <ws-text :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-text>
    </template>
    <template v-if="view_data.type === 'Textarea'">
      <ws-textarea :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-textarea>
    </template>
    <template v-if="view_data.type === 'Radio'">
      <ws-radio :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-radio>
    </template>
    <template v-if="view_data.type === 'Date'">
      <ws-date :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-date>
    </template>
    <template v-if="view_data.type === 'Images'">
      <ws-images :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-images>
    </template>
    <template v-if="view_data.type === 'Html'">
      <ws-html :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-html>
    </template>
  </div>
</template>

<script>
import Text from './Text.vue'
import Textarea from './Textarea.vue'
import Radio from './Radio.vue'
import Date from './Date.vue'
import Images from './Images.vue'
import Html from './Html.vue'
import {extendObject} from '../assets/js/utils'
export default {
  name: 'TypeView',
  components: {
    wsText: Text,
    wsTextarea: Textarea,
    wsRadio: Radio,
    wsDate: Date,
    wsImages: Images,
    wsHtml: Html,
  },
  props:['viewData', 'viewControl'], // 'viewData’ 需要的数据 ‘setControl’配置view数据
  data () {
    return {
      view_data: {},
      view_control: {}
    }
  },
  created () {
    var _self = this
    // 复制父组件的数据
    _self.view_data = extendObject(_self.viewData, true)
    _self.view_control = extendObject(_self.viewControl, true)
  },
  methods: {
    handleUpdate (data) {
      var _self = this
      // 更新数据
      _self.view_data.data = data
      _self.viewData.data = data
    }
  }
}
</script>

<style scoped>
  .view-component {
    position: relative;
    margin: 0;
    padding: 0;
    display: block;
    overflow: hidden;
  }
</style>
