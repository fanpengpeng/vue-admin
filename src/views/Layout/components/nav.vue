<template>
  <div id="nav-wrap">
    这是左侧导航
  </div>
</template>

<script>
export default {
  setup() {
    // 处理业务逻辑
  }
};
</script>

<style lang="scss" scoped>
@import url("../../../styles/base.scss");
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navWidth;
  height: 100vh;
  background-color: #344a5f;
}
</style>
