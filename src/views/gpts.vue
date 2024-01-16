<template>
  <ViewState
    v-if="!store.getters.userinfo"
    Type="error"
    ErrorText="登录查看对话"
    IsShowBottom
    ButtonText="登录"
    @ClickTheButton="loginVisible = true"
  />
  <ViewState v-else-if="load" LoadText="正在加载，请稍后..." />
  <ViewState v-else-if="empty" Type="empty" ErrorText="暂无对话数据" />
  <ViewState
    v-else-if="error"
    @ClickTheButton="init"
    Type="error"
    ErrorText="加载错误，请重试"
    IsShowBottom
    ButtonText="重新加载"
  />

  <div v-else class="body">
    <div :class="seeIndex !== -1 ? 'containerOpen' : ''" class="container">
      <el-scrollbar height="100%" class="leftContent">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="name">{{ item.title }}</div>
          <div class="time">对话于{{ conversionTime(item.createdTime) }}</div>
          <div v-if="!item.isError" class="operation">
            <div
            @click.stop="getDialogueList(item.sessionId)"
              class="operationItem operationItemSelected"
            >
              <el-icon size="14">
                <Promotion />
              </el-icon>
              <div
               class="operationExplain" >查看</div>
            </div>
            <div
              @click="deleteSession(item.sessionId, index)"
              class="operationItem"
              :class="item.isCollection ? 'operationItemSelected' : ''"
            >
              <el-icon size="14">
                <Delete />
              </el-icon>
              <div class="operationExplain">删除对话</div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="block">
      <el-pagination
        v-if="list.length > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="state.pagination.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="state.pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        background
       :total="state.pagination.total">
      </el-pagination>
    </div>
    
    <el-dialog v-model="dialogVisible" title="历史对话">
      <div v-for="(dialogue, index) in dialogueList" :key="index" class="dialogue-item">
        <div v-if="dialogue.role === 'user'" class="user-content">
          <p>{{ dialogue.content }}</p>
        </div>
        <div v-else class="assistant-content">
          <p>{{ dialogue.content }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
  <LoginDialog
    :show="loginVisible"
    @close="loginVisible = false"
    @loginSucceeded="init"
  />

</template>

<script>
import ViewState from "@/components/ViewState.vue";
import { reactive,onMounted, toRefs,ref } from "vue";
import {GetSessionPage,DeleteSession,GetDialogueList} from "../../api/BSideApi";
import { Delete, Promotion, Star } from "@element-plus/icons-vue";
import { ElMessageBox, ElNotification } from "element-plus";
import LoginDialog from "@/components/LoginDialog.vue";
import DialogueView from "@/views/DialogueView.vue";
import store from "@/store";
import { conversionTime } from "@/utils/date";

export default {
  name: "CollectionView",
  methods: { conversionTime },
  computed: {
    store() {
      return store;
    },
  },
  components: { LoginDialog, Star, Promotion, ViewState, Delete ,DialogueView},
  setup() {
    let load = ref(false);
    let empty = ref(false);
    let error = ref(false);
    let list = ref([]);
    let seeIndex = ref(-1);
    let loginVisible = ref(false);
    let dialogueList = ref([]);
    let dialogVisible = ref(false);
    const state = reactive({
      pagination: {
        current: 1,
        size: 10,
        total: 0,
      },
    });

    onMounted(() => {
      if (store.getters.userinfo) init();
    });

    async function init() {
      try {
        load.value = true;
        let res = await GetSessionPage({
          current: state.pagination.current,
          size: state.pagination.size
        });
        if (res.total) {
          list.value = res.rows;
          state.pagination.total = res.total;
        } else {
          empty.value = true;
        }
        load.value = false;
        error.value = false;
      } catch (err) {
        load.value = false;
        error.value = true;
      }
    }

    async function deleteSession(sessionId, index) {
      try {
        await ElMessageBox({
          title: "提示",
          message: "删除对话后数据将不可找回，是否确认删除该对话",
          confirmButtonText: "删除对话",
          cancelButtonText: "再想想",
          showCancelButton: true,
          type: "warning",
        });
        await DeleteSession({sessionId:sessionId});
        ElNotification({
        message: "删除成功",
        type: "success",
      });
        list.value.splice(index, 1);
        if (seeIndex.value === index) seeIndex.value = -1;
      } catch (e) {
        console.log("删除对话", e);
      }
    }

    async function getDialogueList(sessionId) {
      const response = await GetDialogueList({ sessionId: sessionId });
      dialogueList.value = response.rows;
      dialogVisible.value = true;
    }

    // 处理页码变化
    function handleCurrentChange(newPage) {
      state.pagination.current = newPage;
      init();
    }

    // 处理每页条目数变化
    function handleSizeChange(newSize) {
      state.pagination.size = newSize;
      state.pagination.current = 1; 
      init();
    }

    // TODO 复制代码块
    function handleCopyCodeSuccess(code) {
      navigator.clipboard.writeText(code);
      ElNotification({
        message: "复制成功",
        type: "success",
      });
    }

    return {
      load,
      empty,
      error,
      init,
      list,
      deleteSession,
      seeIndex,
      handleCopyCodeSuccess,
      loginVisible,
      handleCurrentChange,
      handleSizeChange,
      state,
      dialogueList,
      getDialogueList,
      dialogVisible
    };
  },
};
</script>

<style scoped>
.body {
  scroll-behavior: smooth;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 30px;
  display: flex;
  overflow: auto;
  background-color: var(--bgColor2);
}

@keyframes explainAnimation {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

.container {
  max-width: 800px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  animation: explainAnimation 0.3s;
}

.containerOpen {
  max-width: 100%;
  display: flex;
  gap: 20px;
}

.leftContent {
  flex: 1;
}

.rightContent {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  background: var(--bgColor1);
  border-radius: 8px;
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #f9f9f9;
}

.desc {
  margin-top: 20px;
}

.item {
  box-sizing: border-box;
  background: var(--bgColor1);
  border-radius: 8px;
  flex-direction: column;
  margin-top: 26px;
  padding: 20px;
  display: flex;
  letter-spacing: 1px;
  width: 100%;
}

.item:first-child {
  margin-top: 0;
}

.item:last-child {
  /*margin-bottom: 20px;*/
}

.name {
  font-size: 16px;
  line-height: 28px;
  color: var(--textColor1);
}

.time {
  margin-top: 5px;
  font-size: 12px;
  color: var(--textColor4);
}

.operation {
  display: flex;
  margin-top: 20px;
}

.operationItem {
  height: 30px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 15px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  background-color: var(--bgColor2);
  border-radius: 100px;
  font-size: 13px;
  color: var(--textColor1);
}

.operationItemSelected {
  background-color: var(--themeColor1);
  color: var(--themeTextColor);
}

.operationExplain {
  margin-left: 5px;
}

::v-deep(.vuepress-markdown-body) {
  padding: 0 0 0 16px;
  color: var(--textColor1);
  background-color: var(--bgColor1);
}
.dialogue-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.user-content {
  text-align: right;
  flex: 1;
}

.assistant-content {
  text-align: left;
  flex: 1;
}

.questions {
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
}
</style>
