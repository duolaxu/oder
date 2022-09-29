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
          <el-form-item label="食品名称" prop="dishName">
            <el-input v-model="formData.dishName"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" prop="dishType">
            <el-input v-model="formData.dishType"></el-input>
          </el-form-item>
          <el-form-item label="食品价格" prop="dishPrice">
            <el-input v-model="formData.dishPrice"></el-input>
          </el-form-item>
          <el-form-item label="上传食品图片" label-width="137px" prop="dishImg">
            <UploadImg :type="status.dishImg" />
          </el-form-item>
          <el-form-item class="button_submit">
            <el-button
              type="primary"
              @click="submitForm('formData', formData)"
              class="elBtn_1"
              >添加</el-button
            >
            <el-button
              @click="() => this.$emit('getDish', 'close')"
              class="elBtn_2"
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
import { addNewDish } from "../../api";
export default {
  data() {
    return {
      status: imgStatus,
      storeId: this.$store.state.storeId,
      city: {},
      formData: {},
      rules: {
        dishName: [
          { required: true, message: "请输入食品名称", trigger: "blur" },
        ],
        dishType: [
          { required: true, message: "请输入食品分类", trigger: "blur" },
        ],
        dishPrice: [{ required: true, message: "请输入菜品价格" }],
        dishImg: [
          { required: false, message: "请上传菜品图片", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    UploadImg,
  },
  mounted() {},
  methods: {
    submitForm(formName, data) {
      this.$refs[formName].validate((valid) => {
        // 表单验证
        if (valid) {
          addNewDish("/addNewDish", {
            dishName: data.dishName,
            dishType: data.dishType,
            dishPrice: data.dishPrice,
            dishImg: this.$store.state.dishImg,
            storeId: this.storeId,
          }).then((res) => {
            this.$emit("getDish", res); // 通知父组件重新拉取数据
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
}
.elBtn_1 {
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
  