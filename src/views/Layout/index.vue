<template>
  <div id="layout-wrap">
    <layout-nav />
    <layout-header />
    <layout-content />
  </div>
</template>

<script>
import layoutNav from "./components/nav";
import layoutHeader from "./components/header";
import layoutContent from "./components/content";
export default {
  components: {
    layoutNav,
    layoutHeader,
    layoutContent
  },
  setup() {
    // 处理业务逻辑
  }
};
</script>

<style lang="scss" scoped>
#layout-wrap {
  background-color: pink;
}
</style>
