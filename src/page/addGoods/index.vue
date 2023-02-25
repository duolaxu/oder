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
            <el-input v-model="this.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="物品分类" prop="dishType">
            <el-select
              v-model="goodsType"
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
            <el-input ref="price" v-model="formData.dishPrice"></el-input>
          </el-form-item>
          <el-form-item label="条形码" prop="shapeCode">
            <!-- <el-input v-model="formData.shapeCode"></el-input> -->
            <input
              type="text"
              placeholder="请扫描条形码"
              ref="input"
              v-on:keyup.enter="submitEnter"
              v-model="this.shapeCode"
            />
          </el-form-item>
          <el-form-item label="物品数量" prop="repertoryNumber">
            <el-input v-model="formData.repertoryNumber"></el-input>
          </el-form-item>
          <el-form-item label="保质期" prop="expirationDate">
            <el-input v-model="formData.expirationDate"></el-input>
          </el-form-item>
          <el-form-item label="上传物品图片" label-width="137px" prop="dishImg">
            <!-- <UploadImg :type="status.dishImg" :src="imgSrc"/> -->
            <img class="avatar" :src="imgSrc" />
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
// import UploadImg from "../../components/uploadImg";
import { imgStatus } from "../../static";
import {
  addNewDish,
  getDishTypeList,
  getShapeCodeApi,
  getShapeCodeInfos,
} from "../../api";
export default {
  props: ["dishListLength"],
  data() {
    return {
      goodsImg: "",
      shapeCode: "",
      goodsType: "生活用品",
      goodsName: "",
      status: imgStatus,
      storeId: this.$store.state.storeId,
      city: {},
      formData: {},
      dishPaperLength: this.dishListLength,
      //   rules: {
      //     dishName: [
      //       { required: true, message: "请输入物品名称", trigger: "blur" },
      //     ],
      //     dishType: [
      //       { required: true, message: "请输入物品分类", trigger: "blur" },
      //     ],
      //     dishPrice: [{ required: true, message: "请输入物品价格" }],
      //     dishImg: [
      //       { required: false, message: "请上传物品图片", trigger: "blur" },
      //     ],
      //   },
      dishTypeList: [],
    };
  },
  components: {
    // UploadImg,
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
    this.enterKeyUp();
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
    async submitEnter() {
      const res = await getShapeCodeInfos("/getShapeCodeInfos", {
        shapeCode: this.shapeCode,
      });
      if (res.data.data.length == 0) {
        const res = await getShapeCodeApi("/getShapeCodeApi", {
          shapeCode: this.shapeCode,
        });
        let data = JSON.parse(res.data.data).data;
        console.log("返回数据 = ", data);
        console.log("物品名称 = ", data.goodsName);
        console.log("物品条形码 = ", data.code);
        console.log("图片链接 = ", data.imgList[0]);
        this.goodsName = data.goodsName;
        this.goodsImg = data.imgList[0];
        this.$nextTick(() => {
          this.$refs.price.focus();
        });
        // abcd
        // this.goodsType = data.gpcType;
      } else {
        this.$message.error("商品已入库, 无需重复入库");
        this.shapeCode = "";
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }

      //   var request = require("request");
      //   //   var querystring = require("querystring");

      //   var headers = {
      //     "Content-Type": "application/json;charset=UTF-8",
      //     "X-Bce-Signature": "AppCode/748de45bb3694a329610216444430bc4",
      //   };

      //   var url = `https://barcodequery.api.bdymkt.com/bar-code/query?code=${this.shapeCode}`;

      //   var options = {
      //     url: url,
      //     method: "POST",
      //     headers: headers,
      //   };

      //   request(options, function (error, response, body) {
      //     if (error !== null) {
      //       console.log("error:", error);
      //       return;
      //     }
      //     console.log(response.headers);
      //     console.log(body);
      //   });
    },
    submitForm(formName, data) {
      this.$refs[formName].validate((valid) => {
        // 表单验证
        if (valid) {
          addNewDish("/addNewDish", {
            shapeCode: this.shapeCode,
            repertoryNumber: 1,
            expirationDate: "",
            dishName: this.goodsName,
            dishType: this.goodsType,
            dishPrice: data.dishPrice,
            dishImg: this.goodsImg,
            storeId: 7,
            serialNumber: 1,
          }).then((res) => {
            this.$message.success("入库成功");
            this.shapeCode = "";
            this.$nextTick(() => {
              this.$refs.input.focus();
            });
            this.$emit("getDish", res); // 通知父组件重新拉取数据
          });
        } else {
          return false;
        }
      });
    },
    async enterKey(event) {
      // console.log("EVENT = ",event.keyCode);
      //   console.log("扫码成功");
      if (event.keyCode == 13) {
        console.log("回车事件发生");
        console.log(event);
        // this.getShapeCodeApi
      } else if (event.keyCode == 39) {
        this.submitForm("formData", this.formData);
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      } else {
        console.log(event.keyCode);
      }
    },
    enterKeyUp() {
      document.addEventListener("keyup", this.enterKey);
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
    