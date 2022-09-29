<template>
  <div class="fillcontain">
    <el-button type="primary" class="addShop" @click="setDialogShow"
      >新增商铺</el-button
    >
    <el-dialog title="添加商铺" v-model="dialogShow">
      <add-shop @getMerchants="getMerchants"></add-shop>
    </el-dialog>
    <div class="table_container">
      <el-table
        :data="tableData"
        highlight-current-row
        style="
          width: 100%;
          border: 1px solid #eff2f7;
          border-width: 1px 1px 0px 1px;
        "
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column property="storeId" label="商铺ID" width="220">
        </el-table-column>
        <el-table-column property="storeName" label="商铺名"> </el-table-column>
        <el-table-column property="storeConnection" label="商铺联系方式">
        </el-table-column>
        <el-table-column property="storeLocation" label="商铺地址" width="220">
        </el-table-column>
        <el-table-column
          property="storeOpeningHours"
          label="商铺营业时间"
          width="220"
        >
        </el-table-column>
        <el-table-column property="storeIncome" label="商铺流水" width="220">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left; margin-top: 10px">
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
import { getStoreList } from "../../api";
import addShop from "./addShop.vue";
export default {
  data() {
    return {
      dialogShow: false,
      tableData: [],
      currentPage: 1,
      count: 0,
    };
  },
  components: {
    addShop,
  },
  created() {
    getStoreList("/getStoreList").then((res) => {
      this.tableData = res.data.data;
      this.count = res.data.data.length;
    });
  },
  methods: {
    setDialogShow() {
      this.dialogShow = !this.dialogShow;
    },
    handleCurrentChange() {},
    getMerchants(data) {
      if (data == "close") {
        this.dialogShow = false;
      } else {
        getStoreList("/getStoreList").then((res) => {
          this.tableData = res.data.data;
          this.count = res.data.data.length;
          this.dialogShow = !this.dialogShow;
        });
      }
    },
  },
};
</script>

<style scoped>
.table_container {
  padding: 20px;
}
.addShop {
  position: relative;
  left: 1.5%;
  top: 1%;
}
</style>
