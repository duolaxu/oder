<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table
        :data="tableData"
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="(row) => row.errandId"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="
          width: 100%;
          border: 1px solid #eff2f7;
          border-width: 1px 1px 0px 1px;
        "
      >
        <el-table-column type="expand">
          <!-- eslint-disable-next-line -->
          <template #="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.userName }}</span>
              </el-form-item>
              <el-form-item label="跑腿凭证">
                <span>{{ props.row.certificate }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.userPhone }}</span>
              </el-form-item>
              <el-form-item label="跑腿内容">
                <span>{{ props.row.orderText }}</span>
              </el-form-item>
              <el-form-item label="跑腿地点">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="订单编号">
                <span>{{ props.row.orderIndex }}</span>
              </el-form-item>
              <el-form-item label="下单时间">
                <span>{{ props.row.errandDate }}</span>
              </el-form-item>
              <el-form-item label="期望送达时间">
                <span>{{ props.row.arriveTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="userName"> </el-table-column>
        <el-table-column label="跑腿凭证" prop="dishName"> </el-table-column>
        <el-table-column label="联系电话" prop="dishType"> </el-table-column>
        <el-table-column label="跑腿内容" prop="orderText"> </el-table-column>
        <el-table-column label="跑腿地点" prop="address"> </el-table-column>
        <el-table-column label="订单编号" prop="orderIndex"> </el-table-column>
        <el-table-column label="下单时间" prop="errandDate"> </el-table-column>
        <el-table-column label="期望送达时间" prop="arriveTime">
        </el-table-column>
      </el-table>
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
    </div>
  </div>
</template>
  
  <script>
import { getErrandList } from "../../api";
import { imgStatus, baseUrl } from "../../static";

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
      currentPage: 1,
      dialogFormVisible: false,
      count: 1,
      selectTable: {},
    };
  },
  watch: {
    currentPage() {
      this.getErrand();
    },
  },
  created() {
    this.getErrand();
  },

  computed: {},
  components: {},
  methods: {
    getErrand() {
      getErrandList("/getErrandList", {
        firstIndex: (this.currentPage - 1) * 20,
        endIndex: 20,
      }).then(async (res) => {
        this.tableData = res.data.data;
        this.count = res.data.total[0]["count(errandId)"];
      });
    },
    handleCancle() {
      this.dialogFormVisible = false;
    },
    handleCurrentChange(e) {
      this.currentPage = e;
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