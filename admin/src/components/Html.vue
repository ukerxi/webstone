<template>
  <div class="view-component">
    <div class="item-title">{{view_control.title}}：</div>
    <div class="item-content">
      <quill-editor ref="htmlEditor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)">
      </quill-editor>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor, Quill } from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/ImageExtend', ImageExtend);
  Quill.register('modules/ImageResize', ImageResize);
  export default {
    name: 'wsHtml',
    props: ['viewData', 'viewControl'],
    components: {
      quillEditor
    },
    data() {
      return {
        content: '',
        editorOption: {
          modules: {
            ImageResize: {},
            ImageExtend: {
              loading: true,
              name: 'image',
              action: '/upload/images',
              response: (res) => {
                return res.data.image.url
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        },
        view_control:{
          // 默认配置参数，可通过 view_control 属性传进来
          title: '内容'
        }
      }
    },
    computed: {
      editor() {
        return this.$refs.htmlEditor.quill
      }
    },
    watch: {
      content: function (newVal, oldVal) {
        // 触发父组件数据变更
        this.triggerData(newVal)
      }
    },
    created() {
      var _self = this;
      _self.content = _self.viewData || ''
      // 赋初值
      if (_self.viewControl && _self.viewControl.title) {
        _self.view_control.title = _self.viewControl.title
      }
    },
    methods: {
      triggerData(data) {
        var _self = this;
        _self.$emit('update', data)
      },
      onEditorBlur(editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        // console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        this.content = html
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
      display: block;
      vertical-align: top;
      line-height: 32px;
    }
    .item-content {
      position: relative;
      display: block;
      overflow: hidden;
    }
  }
</style>
