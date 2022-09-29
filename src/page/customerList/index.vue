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
        <el-table-column property="customerName" label="顾客微信名" width="220">
        </el-table-column>
        <el-table-column property="costDishName" label="消费食品">
        </el-table-column>
        <el-table-column property="costMoney" label="消费金额">
        </el-table-column>
        <el-table-column property="costDate" label="消费日期" width="220">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
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
import { getCustomerList } from "../../api";
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
    getCustomerList("/getCustomerList", {
      storeId: 1,
    }).then((res) => {
      this.tableData = res.data.data;
      this.count = res.data.data.length;
    });
  },
  methods: {
    handleCurrentChange() {},
  },
};
</script>

<style scoped>
.table_container {
  padding: 20px;
}
</style>
