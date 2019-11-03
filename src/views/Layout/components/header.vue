<template>
  <div id="header-wrap">
    这是头部
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
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navWidth;
  height: $headerHeight;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
</style>
