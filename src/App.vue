<template>
  <div id="app" class="fillcontain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    document.title = "哆啦梦";
  },
};
</script>

<style scoped>
@import "./style/common.css";
</style>