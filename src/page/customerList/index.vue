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
        <el-table-column property="customerId" label="顾客ID" width="220">
        </el-table-column>
        <el-table-column property="openId" label="opeId"> </el-table-column>
        <el-table-column property="nickName" label="消费者昵称">
        </el-table-column>
        <!-- <el-table-column property="userImg" label="顾客头像"> </el-table-column> -->
        <el-table-column label="顾客头像">
          <!-- eslint-disable-next-line -->
          <template #="scope">
            <img
              :src="'https://duolago.cn' + scope.row.headImg"
              alt=""
              class="table_img"
            />
          </template>
        </el-table-column>
        <el-table-column property="registerTime" label="注册日期" width="220">
          <!-- <el-table-column label="注册日期">
          <template #="scope">
            <div>{{ scope.row.registerTime }}</div>
          </template>
        </el-table-column> -->
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
  watch: {
    currentPage() {
      this.getCustomer();
    },
  },
  created() {},
  methods: {
    handleCurrentChange(e) {
      this.currentPage = e;
    },
    getCustomer() {
      getCustomerList("/getCustomerList", {
        firstIndex: (this.currentPage - 1) * 20,
        endIndex: 20,
      }).then((res) => {
        this.tableData = res.data.data;
        this.count = res.data.total[0]["count(customerId)"];
      });
    },
  },
};
</script>

<style scoped>
.table_container {
  padding: 20px;
}
.table_img {
  width: 50px;
  height: 50px;
}
</style>
