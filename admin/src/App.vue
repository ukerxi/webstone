<template>
  <div id="app">
    <div class="wrap-nav-menu">
      <span class="text-title" @click="checkMenu">{{isCollapse ? '展开' : '收起'}}</span>
      <el-menu :default-active="nav_active" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <template v-for="(item, key) in nav_menu_list">
          <el-submenu :index="setKey(key)" :key="setKey(key)">
            <template slot="title">
              <i :class="item.icon" v-if="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <template v-if="item.sub_nav && item.sub_nav.length >0">
              <el-menu-item v-for="(sub_item, sub_key) in item.sub_nav" :index="sub_item.link"  :key="setKey(key, sub_key)">{{sub_item.title}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="wrap-view-main" :class="isCollapse ? '': 'active'">
      <!-- 二级主页面 -->
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isCollapse: true,
      nav_active: '/', // 选中菜单
      // 导航菜单
      nav_menu_list: [
        {
          title: '官网首页',
          icon: 'el-icon-document',
          link: '',
          sub_nav: [{title: '编辑信息', icon: '', link: '/'}, {title: '统计数据', icon: '', link: 'collectData'}]
        },
        {
          title: '用户管理',
          icon: 'el-icon-menu',
          link: '',
          sub_nav: [{title: '用户列表', icon: '', link: ''}, {title: '新增用户', icon: '', link: ''}]
        },
        {
          title: '新闻动态',
          icon: 'el-icon-news',
          link: '',
          sub_nav: [{title: '新闻列表', icon: '', link: ''}, {title: '添加动态', icon: '', link: ''}]
        },
      ]
    }
  },
  methods: {
    setKey() {
      let str = "";
      for (let i = 0; i < arguments.length; i++) {
        if (i >= 1) {
          str += '-' + arguments[i];
        } else {
          str += arguments[i];
        }
      }
      return str
    },
    checkMenu () {
      var _self = this
      _self.isCollapse = !_self.isCollapse
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less">
  html {
    position: relative;
    height: 100%;
    width: 100%;
  }
  #app {
    position: absolute;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    overflow: hidden;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    .wrap-nav-menu {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      display: inline-block;
      margin: 0;
      padding: 0;
      text-align: left;
      min-height: 100%;
      z-index: 100;
      border-bottom: solid 1px #e6e6e6;
      border-right: solid 1px #e6e6e6;
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
      .el-menu {
        border-right: none;
      }
    }
    .text-title {
      position: relative;
      display: block;
      vertical-align: top;
      font-size: 14px;
      line-height: 24px;
      color: #666;
      text-align: left;
      border-bottom: solid 1px #e6e6e6;
      padding-left: 10px;
      cursor: pointer;
    }
    .wrap-view-main {
      z-index: 99;
      position: relative;
      display: block;
      margin: 0;
      padding: 0 5px 0 70px;
      overflow: auto;
    }
    .wrap-view-main.active {
      padding-left: 205px;
    }
  }
</style>
