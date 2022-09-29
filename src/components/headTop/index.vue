<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <img :src="headImg" class="avator" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="changeHeadImg">
            <UploadImg
              :isShowImg="isShowImg"
              :type="status"
              :imgDes="imgText"
              @updateHeadImg="updateHeadImg"
            />
          </el-dropdown-item>
          <el-dropdown-item command="signout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { removeAllCookie } from "../../utils/cookie";
import { baseUrl, imgStatus } from "../../static";
import UploadImg from "../uploadImg";
export default {
  data() {
    return {
      headImg: baseUrl + this.$store.state.headImg,
      status: imgStatus.headImg,
      isShowImg: false,
      imgText: "修改头像",
    };
  },
  components: {
    UploadImg,
  },
  created() {},
  computed: {},
  methods: {
    updateHeadImg(imgPath) {
      this.headImg = baseUrl + imgPath;
    },
    handleCommand(command) {
      if (command == "signout") {
        removeAllCookie();
        this.$router.push("/login");
      } else if (command == "changeHeadImg") {
        //
      }
    },
  },
};
</script>

<style scoped>
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
