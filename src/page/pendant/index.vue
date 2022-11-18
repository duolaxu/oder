<template>
  <div class="fillcontain">
    <div v-if="dialogShow">
      <el-dialog :title="title" v-model="dialogShow">
        <el-row style="margin-top: 20px">
          <el-col :span="12" :offset="4">
            <el-form
              :model="formData"
              :rules="rules"
              ref="formData"
              label-width="110px"
              class="demo-formData"
            >
              <el-form-item label="挂件Id" prop="pendantId">
                <el-input
                  v-model="formData.pendantId"
                  disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="挂件名称" prop="pendantName">
                <el-input
                  v-model="formData.pendantName"
                  :disabled="operation == 'edit'"
                ></el-input>
              </el-form-item>
              <el-form-item label="挂件图片url" prop="imgLink">
                <el-input v-model="formData.imgLink"></el-input>
              </el-form-item>
              <el-form-item label="挂件跳转链接" prop="jumpUrl">
                <el-input v-model="formData.jumpUrl"></el-input>
              </el-form-item>
              <!-- <el-form-item label="挂件跳转链接" label-width="137px" prop="dishImg">
            <UploadImg :type="status.dishImg" />
          </el-form-item> -->
              <el-form-item class="button_submit">
                <el-button
                  type="primary"
                  @click="submitForm('formData', formData)"
                  >确定</el-button
                >
                <el-button
                  @click="
                    () => {
                      this.dialogShow = false;
                      this.formData = {};
                    }
                  "
                  >取消</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <el-button type="primary" class="addPendant" @click="addPendant"
      >新增挂件</el-button
    >
    <div class="table_container">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="
          width: 100%;
          border: 1px solid #eff2f7;
          border-width: 1px 1px 0px 1px;
        "
      >
        <el-table-column label="挂件Id" prop="pendantId"> </el-table-column>
        <el-table-column label="挂件名称" prop="pendantName"> </el-table-column>
        <el-table-column label="挂件图片url" prop="imgLink"> </el-table-column>
        <el-table-column label="挂件跳转链接" prop="jumpUrl"> </el-table-column>
        <el-table-column label="挂件开关">
          <template #="props">
            <div>
              <el-switch
                v-model="props.row.putIn"
                active-text="开启"
                inactive-text="关闭"
                @click="updatePutIn(props.row)"
              >
              </el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #="scope">
            <el-button size="small" @click="editPendant(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              disabled="true"
              @click="() => {}"
              >删除</el-button
            >
          </template>
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
      dialogShow: false,
      title: "修改挂件信息",
      formData: {},
      value1: true,
      baseUrl,
      tableData: [],
      preTime: 0,
      operation: "edit",
    };
  },
  watch: {},
  created() {
    postApi("/getPendantAll", {}).then((res) => {
      let result = res.data.data;
      for (let i = 0; i < result.length; i++) {
        result[i].putIn = result[i].putIn == "true" ? true : false;
      }
      this.tableData = res.data.data;
    });
  },
  computed: {},
  components: {},
  methods: {
    addPendant() {
      this.formData = {};
      this.title = "增加挂件信息";
      this.dialogShow = true;
      this.operation = "add";
    },
    editPendant(data) {
      this.formData = data;
      this.dialogShow = true;
      this.title = "修改挂件信息";
      this.operation = "edit";
    },
    submitForm(name, data) {
      if (this.operation == "edit") {
        postApi(`/updatePendant`, {
          imgLink: data.imgLink,
          jumpUrl: data.jumpUrl,
          pendantName: data.pendantName,
          pendantId: data.pendantId,
        }).then(() => {
          postApi("/getPendantAll", {}).then((res) => {
            let result = res.data.data;
            for (let i = 0; i < result.length; i++) {
              result[i].putIn = result[i].putIn == "true" ? true : false;
            }
            this.tableData = res.data.data;
            this.dialogShow = false;
          });
        });
      } else if (this.operation == "add") {
        postApi(`/insertPendant`, {
          imgLink: data.imgLink,
          jumpUrl: data.jumpUrl,
          pendantName: data.pendantName,
          pendantId: data.pendantId,
        }).then(() => {
          postApi("/getPendantAll", {}).then((res) => {
            let result = res.data.data;
            for (let i = 0; i < result.length; i++) {
              result[i].putIn = result[i].putIn == "true" ? true : false;
            }
            this.tableData = res.data.data;
            this.dialogShow = false;
          });
        });
      }
    },
    updatePutIn(data) {
      let time = Date.now();
      if (time - this.preTime >= 1000) {
        this.preTime = time;
        postApi("/updatePutIn", {
          putIn: data.putIn,
          pendantId: data.pendantId,
        }).then(() => {
          postApi("/getPendantAll", {}).then((res) => {
            let result = res.data.data;
            for (let i = 0; i < result.length; i++) {
              result[i].putIn = result[i].putIn == "true" ? true : false;
            }
            this.tableData = res.data.data;
          });
        });
      } else {
        data.putIn = !data.putIn;
      }
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

.addPendant {
  position: relative;
  left: 1.5%;
  top: 1%;
}
</style>