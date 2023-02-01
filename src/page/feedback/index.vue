<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table
        :data="tableData"
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="(row) => row.feedbackId"
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
              <el-form-item label="反馈信息: ">
                <span>{{ props.row.feedbackInfos }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="反馈序号" prop="feedbackId"> </el-table-column>
        <el-table-column label="反馈信息" prop="feedbackInfos">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
      
      <script>
import { postApi } from "../../api";
import { baseUrl } from "../../static";

export default {
  data() {
    return {
      baseUrl,
      tableData: [],
      expendRow: "",
      currentPage: 0,
      count: 1,
    };
  },
  watch: {},
  created() {
    postApi("/getFeedBack", {
      region: "全部",
    }).then((res) => {
      this.tableData = res.data.data;
    });
  },
  computed: {},
  components: {},
  methods: {},
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
</style>