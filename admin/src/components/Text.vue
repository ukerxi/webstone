<template>
  <div class="view-component">
    <el-input placeholder="请输入内容" v-model="text" clearable></el-input>
  </div>
</template>

<script>
export default {
  name: 'Text',
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style scoped>
  .view-component {
    position: relative;
    margin: 0;
    padding: 0;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
  }
</style>
