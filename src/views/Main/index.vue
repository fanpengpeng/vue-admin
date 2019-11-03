<template>
  <div id="main-wrap">
    <layout />
  </div>
</template>

<script>
import layout from "@/views/Layout/index";
export default {
  components: {
    layout
  },
  setup() {
    // 处理业务逻辑
  }
};
</script>

<style lang="scss" scoped>
#main-wrap {
  background-color: pink;
}
</style>
