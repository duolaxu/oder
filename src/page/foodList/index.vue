<template>
  <div class="fillcontain">
    <el-button type="primary" class="addDish" @click="setDialogShow"
      >新增菜品</el-button
    >
    <div v-if="dialogShow">
      <el-dialog title="添加商铺" v-model="dialogShow">
        <AddDish @getDish="getDish" />
      </el-dialog>
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="(row) => row.dishId"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="
          width: 100%;
          border: 1px solid #eff2f7;
          border-width: 1px 1px 0px 1px;
        "
      >
        <el-table-column type="expand">
          <template #="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="菜品名称">
                <span>{{ props.row.dishName }}</span>
              </el-form-item>
              <el-form-item label="菜品ID">
                <span>{{ props.row.dishId }}</span>
              </el-form-item>
              <el-form-item label="菜品价格">
                <span>{{ props.row.dishPrice }}</span>
              </el-form-item>
              <el-form-item label="餐馆ID">
                <span>{{ props.row.storeId }}</span>
              </el-form-item>
              <el-form-item label="菜品评分">
                <span>{{ props.row.dishScore }}</span>
              </el-form-item>
              <el-form-item label="菜品分类">
                <span>{{ props.row.dishType }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.dishMonthSales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="菜品序号" prop="serialNumber">
        </el-table-column>
        <el-table-column label="菜品名称" prop="dishName"> </el-table-column>
        <el-table-column label="菜品分类" prop="dishType"> </el-table-column>
        <el-table-column label="菜品图片">
          <template #="scope">
            <img :src="baseUrl + scope.row.dishImg" alt="" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column label="菜品价格" prop="dishPrice"> </el-table-column>
        <el-table-column label="月销量" prop="dishMonthSales">
        </el-table-column>
        <el-table-column label="评分" prop="dishScore"> </el-table-column>
        <el-table-column label="操作" width="260">
          <template #="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleChange(scope.$index, scope.row)"
              >{{ scope.row.dishStatus == 1 ? "下架" : "上架" }}</el-button
            >
            <el-button
              type="text"
              style="padding: 0; font-size: 13px"
              :disabled="scope.$index == 0"
              @click="moveUp(scope.row, scope.$index)"
              >上移</el-button
            >
            <el-button
              type="text"
              style="padding: 0; font-size: 13px"
              :disabled="scope.$index + 1 == tableData.length"
              @click="moveDown(scope.row, scope.$index)"
              >下移</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="dialogVisible" width="30%">
        <span>确定要将该菜品{{ dishStatus }}吗？</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="changeDish">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="operationVisible" width="30%">
        <span
          >确定要将{{ chooseDishName
          }}{{ operation == 1 ? "下移" : "上移" }}吗？</span
        >
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="operationVisible = false">取消</el-button>
            <el-button type="primary" @click="upDownDish">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <div class="Pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
      <div v-if="dialogFormVisible">
        <el-dialog title="修改菜品信息" v-model="dialogFormVisible">
          <el-form :model="selectTable" :rules="rules" ref="selectTable">
            <el-form-item label="菜品名称" prop="dishName" label-width="100px">
              <el-input
                v-model="selectTable.dishName"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="菜品分类" prop="dishType" label-width="100px">
              <el-input
                v-model="selectTable.dishType"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="菜品图片" prop="dishImg" label-width="100px">
              <UploadImg
                :imgPath="selectTable.dishImg"
                :type="status.dishImg"
              />
            </el-form-item>
            <el-form-item label="菜品价格" prop="dishPrice" label-width="100px">
              <el-input
                v-model="selectTable.dishPrice"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button @click="handleCancle()">取 消</el-button>
            <el-button type="primary" @click="updateDish('selectTable')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDishList,
  updateDish,
  changeDishStatus,
  updateDishSerial,
} from "../../api";
import UploadImg from "../../components/uploadImg";
import { imgStatus, baseUrl } from "../../static";
import AddDish from "./addDish.vue";

export default {
  data() {
    return {
      operateData: {},
      operateIndex: -1,
      operationVisible: false,
      chooseDishName: "",
      operation: 1, // -1上移，1下移
      storeId: this.$store.state.storeId,
      dialogShow: false,
      dialogVisible: false,
      status: imgStatus,
      dishStatus: 0,
      dishData: {},
      baseUrl,
      tableData: [],
      expendRow: "",
      currentPage: 0,
      dialogFormVisible: false,
      count: 1,
      selectTable: {},
      rules: {
        dishName: [
          { required: true, message: "请输入菜品名称", trigger: "blur" },
        ],
        dishType: [
          { required: true, message: "请输入菜品分类", trigger: "blur" },
        ],
        dishPrice: [{ required: true, message: "请输入菜品价格" }],
        dishImg: [
          { required: false, message: "请上传菜品图片", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    dialogFormVisible(value) {
      if (!value) {
        this.getDishData();
      }
    },
    operationVisible(value) {
      if (!value) {
        this.getDishData();
      }
    },
    dialogVisible(value) {
      if (!value) {
        this.getDishData();
      }
    },
    dialogShow(value) {
      if (!value) {
        this.getDishData();
      }
    },
  },
  created() {
    this.getDishData();
  },
  computed: {},
  components: {
    UploadImg,
    AddDish,
  },
  methods: {
    getDishData() {
      getDishList("/getDishList", {
        storeId: this.storeId,
      }).then((res) => {
        this.tableData = res.data.data;
        this.count = res.data.data.length;
      });
    },
    getDish(data) {
      if (data == "close") {
        this.dialogShow = !this.dialogShow;
      } else {
        this.dialogShow = !this.dialogShow;
      }
    },
    setDialogShow() {
      this.dialogShow = !this.dialogShow;
    },
    expand() {},
    updateDish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateDish("/updateDish", {
            dishId: this.selectTable.dishId,
            dishName: this.selectTable.dishName,
            dishPrice: this.selectTable.dishPrice,
            dishType: this.selectTable.dishType,
            dishImg: this.$store.state.dishImg,
            storeId: this.storeId,
            dishScore: this.selectTable.dishScore,
            dishMonthSales: this.selectTable.dishMonthSales,
          }).then(() => {
            this.dialogFormVisible = false;
          });
        } else {
          return false;
        }
      });
    },
    handleCancle() {
      this.dialogFormVisible = false;
    },
    handleCurrentChange() {},
    handleEdit(data) {
      this.dialogFormVisible = true;
      this.selectTable = data;
      this.$store.commit("updateDishImg", data.dishImg);
    },
    handleChange(index, data) {
      this.dishData = data;
      this.dialogVisible = true;
      this.dishStatus = data.dishStatus == 1 ? "下架" : "上架";
    },
    changeDish() {
      changeDishStatus("/changeDishStatus", {
        dishId: this.dishData.dishId,
        dishStatus: this.dishData.dishStatus == 1 ? "0" : "1",
      }).then(() => {
        this.dialogVisible = false;
      });
    },
    moveUp(data, index) {
      this.operation = -1;
      this.chooseDishName = data.dishName;
      this.operationVisible = true;
      this.operateData = data;
      this.operateIndex = index;
      // let dish = this.tableData.splice(index, 1);
      // this.tableData.splice(index - 1, 0, dish[0]);
    },
    moveDown(data, index) {
      this.operation = 1;
      this.chooseDishName = data.dishName;
      this.operationVisible = true;
      this.operateData = data;
      this.operateIndex = index;
      // let dish = this.tableData.splice(index, 1);
      // this.tableData.splice(index + 1, 0, dish[0]);
    },
    upDownDish() {
      updateDishSerial("/updateDishSerial", {
        storeId: this.storeId,
        serialNumber: this.operateIndex + 1, //数据库存储数据下标从1开始
        operationType: this.operation,
        dishId_1: this.tableData[this.operateIndex].dishId,
        dishId_2: this.tableData[this.operateIndex + this.operation].dishId,
      }).then(() => {
        if (this.operation == 1) {
          let dish = this.tableData.splice(this.operateIndex, 1);
          this.tableData.splice(this.operateIndex + 1, 0, dish[0]);
        } else {
          let dish = this.tableData.splice(this.operateIndex, 1);
          this.tableData.splice(this.operateIndex - 1, 0, dish[0]);
        }
        this.operationVisible = false;
      });
    },
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
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
.table_img {
  width: 50px;
  height: 50px;
}

.addDish {
  position: relative;
  left: 1.5%;
  top: 1%;
}
</style>