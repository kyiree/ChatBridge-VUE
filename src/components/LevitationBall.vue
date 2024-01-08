<template>
  <div>
    <img
      src="../assets/ball.svg"
      class="floating-ball"
      ref="ball"
      @mousedown="handleMouseDown"
      @click="dialogVisible = true"
    />
    <el-dialog
      v-model="dialogVisible"
      class="el-dialog"
      style="background-color: var(--bgColor1)"
      align-center="true"
      width="800px"
    >
      <div class="logo">
        <img src="../assets/logoHead.svg" />
      </div>
      <div class="title">常见问题</div>
      <el-scrollbar height="380px" class="el-scrollbar">
        <div class="row" v-for="(item, index) in data" :key="index">
          <div class="line">
            <div style="width: 30px">Q:</div>
            <div style="width: 620px">
              {{ item.q }}
            </div>
          </div>
          <div class="line">
            <div style="width: 30px">A:</div>
            <div style="width: 620px">
              {{ item.a }}
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "LeftNavigationBar",
  methods: {},
  setup() {
    const data = ref([
      {
        q: "如何获取Ai币",
        a: "可以通过微信小程序观看广告获取一定次数(无限制获取)或通过网页端打赏也可获得相应Ai币,还可以通过兑换码来兑换Ai币(点击头像进入兑换中心即可)",
      },

      {
        q: "项目是什么开发的?部署难不难",
        a: "项目主要分为3个部分,Java(后端) UniApp(微信小程序) Vue(网页端) 实现, 中间件为 MySQL Redis,总体来说 很简单... 不懂群里可以问,另外v1.3.0可能会做Docker快速部署",
      },
    ]);

    const ball = ref(null);
    // 在 setup() 中定义以下响应式数据
    const isDragging = ref(false);
    const position = ref({ x: 0, y: 0 });

    const dialogVisible = ref(false);

    // 鼠标按下事件处理
    const handleMouseDown = (e) => {
      isDragging.value = true;
      position.value = {
        x: e.clientX - ball.value.offsetLeft,
        y: e.clientY - ball.value.offsetTop,
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    onMounted(() => {
      setInitialPosition();
    });

    // 鼠标移动事件处理
    const handleMouseMove = (e) => {
      if (!isDragging.value) return;
      const newPositionX = e.clientX - position.value.x;
      const newPositionY = e.clientY - position.value.y;
      ball.value.style.left = `${newPositionX}px`;
      ball.value.style.top = `${newPositionY}px`;
    };

    function setInitialPosition() {
      const ballWidth = ball.value.offsetWidth + 40;
      const ballHeight = ball.value.offsetHeight + 100;

      // 设置初始位置
      const initialPositionX = window.innerWidth - ballWidth;
      const initialPositionY = window.innerHeight - ballHeight;

      ball.value.style.left = `${initialPositionX}px`;
      ball.value.style.top = `${initialPositionY}px`;
    }

    // 鼠标松开事件处理
    const handleMouseUp = () => {
      isDragging.value = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      handleAdsorb();
    };

    function handleAdsorb() {
      const windowWidth = window.innerWidth;
      const ballWidth = ball.value.offsetWidth;
      const ballLeft = ball.value.offsetLeft;
      const edgeThreshold = 30; // 边缘触发阈值

      // 不满足吸附条件则直接返回
      if (
        (ballLeft >= edgeThreshold &&
          ballLeft <= windowWidth / 2 - edgeThreshold) ||
        (ballLeft < windowWidth - ballWidth - edgeThreshold &&
          ballLeft > windowWidth / 2 + edgeThreshold)
      ) {
        return;
      }

      const shouldStickToLeft = ballLeft < windowWidth / 2;
      const newPositionX = shouldStickToLeft
        ? -ballWidth / 2
        : windowWidth - ballWidth / 2;

      // 动画过渡，替换250为需要的过渡时间
      ball.value.animate(
        [{ left: `${ballLeft}px` }, { left: `${newPositionX}px` }],
        250
      );
    }

    return {
      data,
      ball,
      handleMouseDown,
      dialogVisible,
    };
  },
});
</script>

<style scoped>
.floating-ball {
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  cursor: copy;
  z-index: 999;
}

.el-dialog {
  height: 600px;
  border-radius: 10px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 50px;
  height: 50px;
}

.title {
  text-align: center;
  font-size: 15px;
  padding-top: 20px;
  color: #d0d0d0;
  font-weight: 550;
  padding-bottom: 40px;
}

.row {
  padding: 20px;
  margin: 10px 30px;
  background-color: black;
  border-radius: 5px;
}

.line {
  margin-top: 8px;
  display: flex;

  align-items: flex-start;
}
</style>
