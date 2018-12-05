<template>
  <div class="view-component">
    <template v-if="type === 'Text'">
      <ws-text :view-data="view_data"></ws-text>
    </template>
  </div>
</template>

<script>
import Text from './Text.vue'
export default {
  name: 'TypeView',
  components: {
    wsText: Text,
  },
  props: {
    type: '',
    view_data: ''
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    getTypes(type) {

    }
  },
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
