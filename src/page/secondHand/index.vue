<template>
  <div class="fillcontain">
    <el-dialog title="关键字段修改" v-model="dialogVisible" width="30%">
      <div style="display: flex; align-items: center">
        <el-input
          @input="bindInputValue"
          :model-value="inputValue"
          maxlength="40"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="changeSearchKey">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="理由" v-model="dialogReason" width="30%">
      <div style="display: flex; align-items: center">
        <el-input
          :model-value="inputReason"
          @input="bindInputReason"
          maxlength="40"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogReason = false">取消</el-button>
          <el-button
            type="primary"
            @click="changeAuditStatus(2, data, inputReason)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <div class="table_container">
      <el-table
        :data="tableData"
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="(row) => row.goodsId"
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
              <el-form-item
                v-for="(item, index) in props.row.goodsImg.split(',')"
                :key="index"
                class="imgStyle"
                label="房屋图片"
              >
                <span><img :src="item" alt="" class="table_img" /></span>
              </el-form-item>
              <el-form-item label="房屋详细信息">
                <span>{{ props.row.goodsInfos }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="物品序号" prop="goodsId"> </el-table-column>
        <el-table-column label="物品名称" prop="goodsName"> </el-table-column>
        <el-table-column label="物品价格" prop="goodsPrice"> </el-table-column>
        <el-table-column label="联系方式" prop="goodsConnection">
        </el-table-column>
        <el-table-column label="用户Id" prop="userId"> </el-table-column>

        <el-table-column label="关键字段" prop="searchKey">
          <template #="props">
            <div
              @click="changeInputVal(props)"
              style="width: 100%; height: 30px"
              v-if="props.row.searchKey == null"
            >
              {{ props.row.searchKey }}
            </div>
            <div v-else @click="changeInputVal(props)">
              {{ props.row.searchKey }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="审核状态">
          <template #="scope">
            <div>{{ this.auditStatus[scope.row.auditStatus] }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #="scope">
            <el-button
              :disabled="scope.row.auditStatus == 0 ? false : true"
              size="small"
              @click="changeAuditStatus(1, scope.row, '')"
              >通过</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="setGoods(scope.row)"
              :disabled="scope.row.auditStatus == 0 ? false : true"
              >拒绝</el-button
            >
            <el-button
              :disabled="scope.row.auditStatus == 1 ? false : true"
              size="small"
              @click="changeAuditStatus(-1, scope.row, '')"
              >下架</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="changeCurrentPage"
        :total="total"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
    
    <script>
import { postApi } from "../../api";
import { baseUrl } from "../../static";

export default {
  data() {
    return {
      pagesize: 10,
      total: 0,
      currentPage: 1,
      auditStatus: {
        0: "待审核",
        1: "审核通过",
        2: "审核不通过",
        3: "已下架",
      },
      baseUrl,
      tableData: [],
      expendRow: "",
      count: 1,
      goodsId: 0,
      inputValue: "",
      isInput: false,
      dialogVisible: false,
      dialogReason: false,
      inputReason: "",
      data: 0,
    };
  },
  watch: {
    currentPage() {
      this.getHouseAll();
    },
  },
  created() {
    this.getGoodsAll();
  },
  computed: {},
  components: {},
  methods: {
    setGoods(data) {
      this.data = data;
      this.dialogReason = true;
    },
    bindInputReason(e) {
      this.inputReason = e;
    },
    getGoodsAll() {
      postApi("/getSecondHandAll", {
        houseType: "全部",
        region: "全部",
        firstIndex: (this.currentPage - 1) * 10,
        endIndex: this.currentPage * 10,
      }).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total[0]["count(goodsId)"];
      });
    },
    bindInputValue(e) {
      this.inputValue = e;
    },
    changeSearchKey() {
      postApi("/changeSearchKey", {
        infotype: 2,
        goodsId: this.goodsId,
        searchKey: this.inputValue,
      }).then(() => {
        this.dialogVisible = false;
        this.inputValue = "";
        this.getGoodsAll();
      });
    },
    changeInputVal(data) {
      this.goodsId = data.row.goodsId;
      this.inputValue = data.row.searchKey;
      this.dialogVisible = true;
    },
    changeAuditStatus(status, data, reason) {
      postApi("/updateSecondHand", {
        auditStatus: status,
        houseId: data.houseId,
        rejectReason: reason == "" ? "" : reason,
      }).then(() => {
        this.getGoodsAll();
        this.dialogReason = false;
      });
    },
    expand() {},
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
.table_img {
  width: 100px;
  height: 100px;
  display: inline-block;
}
.imgStyle {
  display: flex;
}
</style>