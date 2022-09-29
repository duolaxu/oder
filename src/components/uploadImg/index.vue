<template>
  <div class="fillcontain">
    <el-upload
      class="avatar-uploader"
      :action="url"
      :show-file-list="false"
      :on-success="handleServiceAvatarScucess"
      :before-upload="beforeImgUpload"
      enctype="multipart/form-data"
      :headers="{ imgType: status }"
    >
      <!-- {{ imgDescription }} -->
      <div v-if="showHeadImg">
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
        <el-icon v-else class="el-icon-plus avatar-uploader-icon">
          <Plus />
        </el-icon>
      </div>
      <div v-else>
        {{ imgDescription }}
      </div>
    </el-upload>
  </div>
</template>
  
  <script>
import { Plus } from "@element-plus/icons-vue"; // 引入图标
import { baseUrl } from "../../static";
import { setCookie } from "../../utils/cookie";
export default {
  props: ["imgPath", "type", "isShowImg", "imgDes"],
  data() {
    return {
      baseUrl,
      imgUrl: baseUrl + this.imgPath,
      url: baseUrl + "/uploadImg",
      status: this.type,
      showHeadImg: this.isShowImg == "" ? false : true,
      imgDescription: this.imgDes,
    };
  },
  created() {},
  computed: {},
  components: {
    Plus,
  },
  methods: {
    handleServiceAvatarScucess(data) {
      if (this.status == 0) {
        setCookie("headImg", data.url, 30, "/");
        this.$store.commit("updateHeadImg", data.url);
        this.$emit("updateHeadImg", data.url);
      } else if (this.status == 1) {
        this.$store.commit("updateDishImg", data.url);
      } else if (this.status == 2) {
        this.$store.commit("updateStoreHeadImg", data.url);
      } else if (this.status == 3) {
        this.$store.commit("updateStoreBusinessImg", data.url);
      } else if (this.status == 4) {
        this.$store.commit("updateCateringLicense", data.url);
      }
      this.imgUrl = baseUrl + data.url;
    },
    beforeImgUpload(file) {
      const uploadLimit = 2;
      const uploadTypes = ["jpg", "png"];
      const filetype = file.name.replace(/.+\./, "");
      const isRightSize = (file.size || 0) / 1024 / 1024 < uploadLimit;
      if (!isRightSize) {
        this.$message.error("文件大小超过 " + uploadLimit + "MB");
        return false;
      }

      if (uploadTypes.indexOf(filetype.toLowerCase()) === -1) {
        this.$message.warning({
          message: "请上传后缀名为jpg、png的图片",
        });
        return false;
      }
      return true;
    },
  },
};
</script>
  
  <style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>