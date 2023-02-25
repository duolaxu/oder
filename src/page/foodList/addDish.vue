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
          <el-form-item label="物品名称" prop="dishName">
            <el-input v-model="formData.dishName"></el-input>
          </el-form-item>
          <el-form-item label="物品分类" prop="dishType">
            <el-select
              v-model="formData.dishType"
              filterable
              :multiple="false"
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="选择或添加物品分类"
            >
              <el-option
                v-for="item in dishTypeList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="物品价格" prop="dishPrice">
            <el-input v-model="formData.dishPrice"></el-input>
          </el-form-item>
          <el-form-item label="条形码" prop="shapeCode">
            <el-input v-model="formData.shapeCode"></el-input>
          </el-form-item>
          <el-form-item label="物品数量" prop="repertoryNumber">
            <el-input v-model="formData.repertoryNumber"></el-input>
          </el-form-item>
          <el-form-item label="保质期" prop="expirationDate">
            <el-input v-model="formData.expirationDate"></el-input>
          </el-form-item>
          <el-form-item label="上传物品图片" label-width="137px" prop="dishImg">
            <UploadImg :type="status.dishImg" />
          </el-form-item>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="submitForm('formData', formData)"
              >添加</el-button
            >
            <el-button @click="() => this.$emit('getDish', 'close')"
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
import { addNewDish, getDishTypeList } from "../../api";
export default {
  props: ["dishListLength"],
  data() {
    return {
      status: imgStatus,
      storeId: this.$store.state.storeId,
      city: {},
      formData: {},
      dishPaperLength: this.dishListLength,
      rules: {
        dishName: [
          { required: true, message: "请输入物品名称", trigger: "blur" },
        ],
        dishType: [
          { required: true, message: "请输入物品分类", trigger: "blur" },
        ],
        dishPrice: [{ required: true, message: "请输入物品价格" }],
        dishImg: [
          { required: false, message: "请上传物品图片", trigger: "blur" },
        ],
      },
      dishTypeList: [],
    };
  },
  components: {
    UploadImg,
  },
  mounted() {
    // this.enterKeyUp();
    getDishTypeList("/getDishTypeList", {
      storeId: this.storeId,
    }).then((res) => {
      this.dishTypeList = res.data.data;
    });
  },
  created() {
    this.$store.commit("updateDishImg", "");
  },
  methods: {
    // enterKey() {
    //   console.log("扫码成功");
    // },
    // enterKeyUp() {
    //   document.addEventListener("keyup", this.enterKey);
    // },
    submitForm(formName, data) {
      this.$refs[formName].validate((valid) => {
        // 表单验证
        if (valid) {
          addNewDish("/addNewDish", {
            shapeCode: data.shapeCode,
            repertoryNumber: data.repertoryNumber,
            expirationDate: data.expirationDate,
            dishName: data.dishName,
            dishType: data.dishType,
            dishPrice: data.dishPrice,
            dishImg: this.$store.state.dishImg,
            storeId: this.storeId,
            serialNumber: this.dishPaperLength + 1,
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
  