<template>
  <div class="view-page-index">
    <h1>{{ msg }}</h1>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'webstone admin '
    }
  }
}
</script>

<style scoped>
  .view-page-index {
    position: relative;
  }
</style>
