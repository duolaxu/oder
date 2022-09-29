<template>
  <div class="fillcontain">
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
        <el-table-column property="merchantName" label="商户微信名" width="220">
        </el-table-column>
        <el-table-column property="merchantPhone" label="商户电话号码">
        </el-table-column>
        <el-table-column property="merchantRegisterDate" label="注册日期">
        </el-table-column>
        <el-table-column property="storeName" label="商铺名" width="220">
        </el-table-column>
        <el-table-column property="storeId" label="商铺ID" width="220">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @current-change="currentPageChange"
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
import { getMerchantList } from "../../api";
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      currentPage: 1,
    };
  },
  components: {},
  created() {
    getMerchantList("/getMerchantList").then((res) => {
      this.tableData = res.data.data;
      this.count = res.data.data.length;
    });
  },
  methods: {
    currentPageChange() {},
  },
};
</script>

<style scoped>
.table_container {
  padding: 20px;
}
</style>
