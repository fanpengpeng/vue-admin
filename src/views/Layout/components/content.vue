<template>
  <div id="content-wrap">
    这是内容区
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
#content-wrap {
  position: fixed;
  top: $headerHeight;
  right: 0;
  bottom: 0;
  left: $navWidth;
  border: 30px solid #f7f7f7;
  border-bottom: none;
}
</style>
