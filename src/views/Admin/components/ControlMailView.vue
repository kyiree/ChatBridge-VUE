<template>
  <div class="s_container">
    <el-scrollbar height="100%">
      <el-form class="demo-form-inline" label-position="left">
        <el-form-item label="邮箱" label-width="200px">
          <el-input
            placeholder="123456789@qq.com"
            clearable
            v-model="form.username"
          />
        </el-form-item>
        <el-form-item label="授权码" label-width="200px">
          <el-input placeholder="123456" clearable v-model="form.password" />
        </el-form-item>
        <el-form-item label="端口" label-width="200px">
          <el-input placeholder="465" clearable v-model="form.port" />
        </el-form-item>
        <el-form-item label="发送邮件服务器" label-width="200px">
          <el-input placeholder="smtp.qq.com" clearable v-model="form.host" />
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
import { GetMail, PutMail } from "../../../../api/BSideApi";
import { ElLoading, ElNotification } from "element-plus";

export default {
  name: "ControlPanelView",
  computed: {
    store() {
      return store;
    },
  },
  setup: function () {
    let form = ref({
      username: '',
      password: '',
      host: '',
      port: ''
    });

    onMounted(() => {
      getMailConfig();
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
        await PutMail(value);
        await getMailConfig();
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

    async function getMailConfig() {
      try {
        let newVar = await GetMail();
        if (newVar) {
          form.value = newVar;
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
</style>
