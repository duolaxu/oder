<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="110px"
          class="demo-formData"
        >
          <el-form-item label="店铺名称" prop="storeName">
            <el-input v-model="formData.storeName"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="storeLocation">
            <el-autocomplete
              v-model="formData.storeLocation"
              placeholder="请输入地址"
              style="width: 100%"
            ></el-autocomplete>
            <!-- <span>当前城市：{{ city.name }}</span> -->
          </el-form-item>
          <el-form-item label="联系电话" prop="storeConnection">
            <el-input
              v-model.number="formData.storeConnection"
              maxLength="11"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="营业时间"
            style="white-space: nowrap"
            prop="storeOpeningHours"
          >
            <el-time-select
              placeholder="起始时间"
              v-model="formData.startTime"
              :picker-options="{
                start: '05:30',
                step: '00:15',
                end: '23:30',
              }"
            >
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="formData.endTime"
              :picker-options="{
                start: '05:30',
                step: '00:15',
                end: '23:30',
                minTime: formData.startTime,
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item
            label="上传店铺头像"
            label-width="137px"
            prop="storeHeadImg"
          >
            <UploadImg :type="status.storeHeadImg" />
          </el-form-item>
          <el-form-item
            label="上传营业执照"
            label-width="137px"
            prop="storeBusinessImg"
          >
            <UploadImg :type="status.storeBusinessImg" />
          </el-form-item>
          <el-form-item
            label="上传餐饮服务许可证"
            label-width="180px"
            prop="cateringLicense"
          >
            <UploadImg :type="status.cateringLicense" />
          </el-form-item>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="submitForm('formData')"
              >确定</el-button
            >
            <el-button
              type="primary"
              @click="this.$emit('getMerchants', 'close')"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadImg from "../../components/uploadImg";
import { imgStatus } from "../../static";
import { addNewStore } from "../../api";
export default {
  data() {
    return {
      status: imgStatus,
      city: {},
      formData: {},
      rules: {
        storeName: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
        ],
        storeLocation: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        storeConnection: [
          { required: true, message: "请输入联系电话" },
          { type: "number", message: "电话号码必须是数字" },
        ],
        storeHeadImg: [
          { required: false, message: "请上传店铺头像", trigger: "blur" },
        ],
        storeBusinessImg: [
          { required: false, message: "请上传店铺营业执照", trigger: "blur" },
        ],
        cateringLicense: [
          { required: false, message: "请上传餐饮服务许可证", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    UploadImg,
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.formData;
          addNewStore("/addNewStore", {
            storeName: data.storeName,
            storeLocation: data.storeLocation,
            storeConnection: data.storeConnection,
            storeOpeningHours: `${data.startTime}-${data.endTime}`,
            storeHeadImg: this.$store.state.storeHeadImg,
            storeBusinessImg: this.$store.state.storeBusinessImg,
            cateringLicense: this.$store.state.cateringLicense,
          }).then(() => {
            this.$emit("getMerchants", "update"); // 通知父组件重新拉取数据
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.button_submit {
  text-align: center;
}
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
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}

#avatar_upload {
  position: relative;
  left: -3vw;
  top: 3vh;
}
</style>
