<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%">
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%"
          router
          text-color="#fff"
          background-color="#324057"
          active-text-color="#3190e8"
        >
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="recentHouse">房屋信息</el-menu-item>
          <el-menu-item index="secondHand">二手物品</el-menu-item>
          <el-menu-item index="recruitment">职位信息</el-menu-item>
          <el-menu-item index="pendant">挂件管理</el-menu-item>
          <el-menu-item index="report">举报反馈</el-menu-item>
          <el-menu-item index="feedback">用户体验反馈</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <head-top />
        <keep-alive>
          <router-view> </router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
export default {
  data() {
    return {
      rolePermission: this.$store.state.rolePermission,
    };
  },
  mounted() {},
  components: {
    headTop,
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>


<style scoped>
.elMenu {
  background-color: #324057 !important;
  color: white !important;
}
</style>
