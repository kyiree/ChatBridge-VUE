<template>
  <div class="s_container">
    <el-scrollbar height="100%">
      <el-form class="demo-form-inline" label-position="left">
        <el-form-item label="公告栏" >
          <div class="custom-form-item">
          <el-input
            clearable
            v-model="form.context"
            type="textarea"
            rows="10"
            
          />
          </div>
        </el-form-item>
      </el-form>

      <div class="btn-container">
        <el-button
          color="var(--themeColor2)"
          style="width: 200px"
          @click="onSubmit"
          >重载数据</el-button
        >
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import store from "@/store";
import { onMounted, ref } from "vue";
import { GetAnnouncement, PutAnnouncement } from "../../../../api/BSideApi";
import { ElLoading, ElNotification } from "element-plus";

export default {
  name: "ControlAnnouncementView",
  computed: {
    store() {
      return store;
    },
  },
  setup: function () {
    let form = ref({
      context: ""
    });

    onMounted(() => {
      getAnnouncement();
    });
    async function onSubmit() {
      let value = form.value;
      
      try {
        ElLoading.service({
          fullscreen: true,
          text: "正在重载配置...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        await PutAnnouncement(value);
        await getAnnouncement();
        ElLoading.service().close();
        ElNotification({
          title: "成功",
          message: "重载成功",
          type: "success",
        });
      } catch (e) {
        ElNotification({
          title: "错误",
          message: e,
          type: "error",
        });
      }
    }

    async function getAnnouncement() {
      try {
        let newVar = await GetAnnouncement();
        if (newVar) {
          form.value.context = newVar.context;
        }
      } catch (e) {
        console.log(e);
      }
    }

    return {
      onSubmit,
      form,
    };
  },
};
</script>

<style scoped>
@keyframes explainAnimation {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

::v-deep(
    .el-table--enable-row-hover .el-table__body tr:hover td.el-table__cell
  ) {
  background: none !important;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 100px;
  padding-top: 10px;
}

::v-deep(
    .el-pagination .is-background .el-pager li:not(.is-disabled).is-active
  ) {
  background-color: rgb(125, 128, 255);
}

::v-deep(.el-table-fixed-column--right) {
  background: var(--bgColor1) !important;
}

::v-deep(
    .el-table--enable-row-hover .el-table__body tr:hover td.el-table__cell
  ) {
  background: none;
}

/deep/ .el-input__inner {
  background: var(--bgColor2);

  font-weight: 400;
  color: var(--textColor2);
}

/deep/ .el-input__wrapper {
  background: var(--bgColor2);
  box-shadow: none;
}
.custom-form-item {
  /* 设置你需要的样式，例如宽度、高度等 */
  width: 300px;
  background-color: black;
  color: white;
  /* 其他样式 */
}

</style>
