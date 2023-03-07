<template>
  <div class="fillcontain">
    <div class="inputCode">
      <input
        type="text"
        placeholder="请扫描条形码"
        ref="input"
        v-model="this.shapeCode"
      />
    </div>
    <!-- v-on:keyup.enter="submitEnter" -->
    <div class="cartButton">
      <el-button type="primary" @click="clearCart">清空</el-button>
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
        <el-table-column label="物品名称" prop="dishName"> </el-table-column>
        <el-table-column label="物品分类" prop="dishType"> </el-table-column>
        <el-table-column label="物品图片">
          <!-- eslint-disable-next-line -->
          <template #="scope">
            <img :src="scope.row.dishImg" alt="" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column label="物品价格" prop="dishPrice"> </el-table-column>
        <el-table-column label="操作" width="260">
          <!-- eslint-disable-next-line -->
          <template #="scope">
            <el-button size="small" @click="deleteEdit(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="totalPrice">总计: {{ totalPrice }} 元</div>
  </div>
</template>
  
  <script>
import { getShapeCodeInfos } from "../../api";
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      currentPage: 1,
      shapeCode: "",
      totalPrice: 0,
    };
  },
  components: {},
  created() {
    this.enterKeyup();
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.input.focus();
    // });
  },
  methods: {
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
    enterKey(event) {
      if (event.keyCode == 13) {
        this.submitEnter();
      } else {
        this.shapeCode = this.shapeCode + (event.keyCode - 48);
      }
    },
    clearCart() {
      this.tableData = [];
      this.totalPrice = 0;
    },
    deleteEdit(e) {
      let arr = this.tableData;
      let judge = false;
      this.tableData = arr.filter((item) => {
        if (judge == false) {
          // 表示没有遇到匹配值
          if (item.dishId == e.dishId) {
            judge = true; // 遇到匹配值
          }
          return item.dishId != e.dishId;
        }
        return true;
      });
      let price = 0;
      this.tableData.map((item) => {
        price += parseInt(item.dishPrice);
      });
      this.totalPrice = price;
    },
    handleCurrentChange() {},
    async submitEnter() {
      const res = await getShapeCodeInfos("/getShapeCodeInfos", {
        shapeCode: this.shapeCode,
      });
      if (res.data.code == 0) {
        // this.$nextTick(() => {
        //   this.$refs.input.focus();
        // });
        let arr = res.data.data;
        this.tableData = this.tableData.concat(arr);
        let price = 0;
        this.tableData.map((item) => {
          price += parseInt(item.dishPrice);
        });
        this.totalPrice = price;
        // for (let item of this.tableData) {
        //   item.dishPrice = item.dishPrice + "元";
        // }
      }
      this.shapeCode = "";
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
.inputCode {
  position: relative;
  left: 20px;
}
.totalPrice {
  position: fixed;
  right: 40px;
  bottom: 20px;
  color: rgb(64, 158, 255);
}
.cartButton {
  position: fixed;
  right: 20px;
  top: 65px;
  /* background-color: rgb(64, 158, 255); */
}
</style>
  