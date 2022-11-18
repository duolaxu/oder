<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"
              ><span>dsfsf</span></el-input
            >
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
              class="submit_btn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </section>
    </transition>
    <div
      style="
        position: absolute;
        width: 100%;
        height: 50px;
        bottom: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      "
    >
      <img
        style="width: 15px; height: 15px"
        src="https://duolago.cn/icon/beian.png"
      />
      <a href="https://beian.miit.gov.cn" target="_blank"
        >&nbsp;蜀ICP备2022025866号 武侯区哆啦信息咨询服务部版权所有</a
      >
    </div>
  </div>
</template>

<script>
import { login } from "../../api/index";
import { setCookie } from "../../utils/cookie";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
      showLogin: false,
    };
  },
  mounted() {
    this.showLogin = true;
  },
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 表单验证
        if (valid) {
          if (this.loginForm.username != "" && this.loginForm.password != "") {
            login("/login", {
              username: this.loginForm.username,
              password: this.loginForm.password,
            }).then((res) => {
              if (res.data.code != 0) {
                this.$message.error(res.data.msg + "，请重新输入");
              } else {
                let data = res.data.data.data;
                setCookie("username", data.adminName, 30, "/");
                setCookie("merchantPhone", data.merchantPhone, 30, "/");
                setCookie("storeId", data.storeId, 30, "/");
                setCookie(
                  "merchantRegisterDate",
                  data.merchantRegisterDate,
                  30,
                  "/"
                );
                setCookie("storeName", data.storeName, 30, "/");
                setCookie("permission", data.permission, 30, "/");
                setCookie("headImg", data.userImg, 30, "/");
                this.$store.commit("updateRolePermission", data.permission);
                this.$store.commit("updateStoreId", data.storeId);
                this.$store.commit("updateHeadImg", data.userImg);
                this.$router.push("/home");
              }
            });
          } else {
            this.$message.error("用户名和密码不能为空");
          }
        } else {
          return false;
        }
      });
    },
  },
  watch: {},
};
</script>

<style scoped>
a:hover {
  color: red;
}
a {
  color: white;
}
.login_page {
  background-color: #324057;
  display: flex;
  justify-content: center;
  align-items: center;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
}
.manage_tip p {
  font-size: 34px;
  color: #fff;
}
.form_contianer {
  width: 320px;
  height: 140px;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
}
.form_contianer .submit_btn {
  width: 100%;
  font-size: 16px;
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
