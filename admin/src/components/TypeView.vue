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
    <template v-if="view_data.type === 'DateTime'">
      <ws-date-time :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-date-time>
    </template>
    <template v-if="view_data.type === 'Images' || view_data.type === 'Image'">
      <ws-images :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-images>
    </template>
    <template v-if="view_data.type === 'Files' || view_data.type === 'File'">
      <ws-files :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-files>
    </template>
    <template v-if="view_data.type === 'Html'">
      <ws-html :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-html>
    </template>
    <template v-if="view_data.type === 'ColorPicker'">
      <ws-color-picker :view-data="view_data.data" :view-control="view_control" @update="handleUpdate"></ws-color-picker>
    </template>
  </div>
</template>

<script>
import Text from './Text.vue'
import Textarea from './Textarea.vue'
import Radio from './Radio.vue'
import Date from './Date.vue'
import DateTime from './DateTime.vue'
import Images from './Images.vue'
import Files from './Files.vue'
import Html from './Html.vue'
import ColorPicker from './ColorPicker.vue'
import {extendObject} from '../assets/js/utils'
export default {
  name: 'TypeView',
  components: {
    wsText: Text,
    wsTextarea: Textarea,
    wsRadio: Radio,
    wsDate: Date,
    wsDateTime: DateTime,
    wsImages: Images,
    wsFiles: Files,
    wsHtml: Html,
    wsColorPicker: ColorPicker,
  },
  props:['viewData', 'viewControl'], // 'viewData’ 需要的数据 ‘setControl’配置view数据
  data () {
    return {
      view_data: {},
      view_control: {}
    }
  },
  created () {
    var _self = this;
    // 复制父组件的数据
    _self.view_data = extendObject(_self.viewData, true);
    _self.view_control = extendObject(_self.viewControl, true);
    _self.view_control.title = _self.view_data.label || '标题';
    // 扩展类型，根据已有的类型扩展相同类型
    if (_self.view_data.type === 'Image') {
      _self.view_control.limit = 1;
      _self.view_control.dataType = 'object';
    } else if (_self.view_data.type === 'File') {
      _self.view_control.limit = 1;
      _self.view_control.dataType = 'object';
    }
  },
  methods: {
    handleUpdate (data) {
      var _self = this;
      // 更新数据
      _self.view_data.data = data;
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
