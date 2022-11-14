<template>
  <div class="fillcontain">
    <el-dialog title="关键字段修改" v-model="dialogVisible" width="30%">
      <div style="display: flex; align-items: center">
        <!-- 你选择了<span style="color: red">{{ regionName }}</span> -->
        <el-input
          :model-value="inputValue"
          @input="bindInputValue"
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

    <el-dialog v-model="inputDislog" width="30%">
      <div style="display: flex; align-items: center">
        你选择了<span style="color: red">{{ regionName }}</span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="inputDislog = false">取消</el-button>
          <el-button type="primary" @click="changeRegion">确定</el-button>
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
        :row-key="(row) => row.recruitId"
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
                v-for="(item, index) in props.row.recruitImg.split(',')"
                :key="index"
                class="imgStyle"
                label="房屋图片"
              >
                <span><img :src="item" alt="" class="table_img" /></span>
              </el-form-item>
              <el-form-item label="房屋详细信息">
                <span>{{ props.row.recruitInfos }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="职位序号" prop="recruitId"> </el-table-column>
        <el-table-column label="职位类型" prop="recruitType"> </el-table-column>
        <el-table-column label="工作职位" prop="recruitName"> </el-table-column>
        <el-table-column label="工作地点" prop="recruitAddress">
        </el-table-column>
        <el-table-column label="工资薪水" prop="recruitSalary">
        </el-table-column>
        <el-table-column label="联系方式" prop="recruitConnection">
        </el-table-column>
        <el-table-column label="用户Id" prop="userId"> </el-table-column>

        <el-table-column label="地区" width="115">
          <template #="props">
            <ElDropdown :disabled="props.row.region != null ? true : false">
              <span class="el-dropdown-link">
                {{ props.row.region == null ? "区域选择" : props.row.region }}
                <el-icon class="el-icon--right">
                  <div v-if="props.row.region == null">
                    <ArrowDown />
                  </div>
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu
                  #="dropdown"
                  style="width: 80px; height: 300px; overflow: scroll"
                >
                  <el-dropdown-item
                    v-for="item in regionArr"
                    :key="item"
                    v-text="item"
                    :command="item"
                    @click="getVal(props, item)"
                  ></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </ElDropdown>
          </template>
        </el-table-column>

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
              @click="setRecruit(scope.row)"
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
import { ArrowDown } from "@element-plus/icons-vue";

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
      regionArr: [],
      dialogVisible: false,
      regionName: "",
      recruitId: 0,
      inputValue: "",
      isInput: false,
      inputDislog: false,
      dialogReason: false,
      inputReason: "",
      data: 0,
    };
  },
  watch: {
    currentPage() {
      this.getRecruitAll();
    },
  },
  created() {
    postApi("/getCityArea", {
      cityCode: 510100,
    }).then((res) => {
      let arr = res.data.data.result[0];
      let area = [];
      arr.map((item) => {
        area.push(item.fullname);
      });
      this.regionArr = area;
    });
    this.getRecruitAll();
  },
  computed: {},
  components: { ArrowDown },
  methods: {
    setRecruit(data) {
      this.data = data;
      this.dialogReason = true;
    },
    bindInputReason(e) {
      this.inputReason = e;
    },
    getRecruitAll() {
      postApi("/getRecruitAll", {
        region: "全部",
        firstIndex: (this.currentPage - 1) * 10,
        endIndex: this.currentPage * 10,
      }).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total[0]["count(recruitId)"];
      });
    },
    bindInputValue(e) {
      this.inputValue = e;
    },
    changeSearchKey() {
      postApi("/changeSearchKey", {
        infotype: 3,
        recruitId: this.recruitId,
        searchKey: this.inputValue,
      }).then(() => {
        this.dialogVisible = false;
        this.inputValue = "";
        this.getRecruitAll();
      });
    },
    changeInputVal(data) {
      this.recruitId = data.row.recruitId;
      this.inputValue = data.row.searchKey;
      this.dialogVisible = true;
    },
    getVal(data, region) {
      this.regionName = region;
      this.recruitId = data.row.recruitId;
      this.inputDislog = true;
    },
    changeRegion() {
      postApi("/selectArea", {
        infotype: 3,
        recruitId: this.recruitId,
        region: this.regionName,
      }).then(() => {
        this.inputDislog = false;
        this.getRecruitAll();
      });
    },
    changeAuditStatus(status, data, reason) {
      postApi("/updateRecruit", {
        auditStatus: status,
        recruitId: data.recruitId,
        rejectReason: reason == "" ? "" : reason,
      }).then(() => {
        this.getRecruitAll();
        this.dialogReason=false;
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