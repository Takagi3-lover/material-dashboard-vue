<template>
  <header style="height: 100%;background-color:rgb(34,34,34)">
    <div style="height: 100%">
      <div style="margin-left:20px;margin-top: -10px; height: 40%; font-size:20px;color: rgb(255,255,255)">软件缺陷分析与预测系统</div>
      <div style="margin-left:20px;margin-top: 0;height: 20%; font-size:8px;color: rgb(255,255,255)">Software Defect and Prediction System</div>
    </div>

    <div style="height:100%">
      <el-dropdown :hide-on-click="false">
        <div>
          <el-avatar :size="40" :src="avatar" :class="['avatar-info']">
          </el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown" style="margin-top:-20px;margin-left: -40px;text-align: center">
          <el-dropdown-item @click.native="toPersonal"><i class="el-icon-info"></i>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      //头像路径
      //TODO:头像路径,获取用户名
      avatar: 'http://localhost:9090/getIcon?email=' + sessionStorage.getItem("email"),
      msg: "Welcome to Your Vue.js App"
    }
  },
  methods: {
    toPersonal() {
      this.$router.push('/personal')
    },
    logout() {
      this.$router.push('/login')
    },
  }

}
</script>

<style scoped>
header {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*背景设置为黑色渐变色*/
  background-color: rgb(83, 122, 199);
}

/*设定头像图片样式*/
.avatar-info {
  margin-top: 10px;
  margin-right: 40px;
  cursor: pointer;
}

.multi-color {
  /*字体颜色设置为渐变色*/
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(
      left,
      rgb(42, 134, 141),
      #e9e625dc 20%,
      #3498db 40%,
      #e74c3c 60%,
      #09ff009a 80%,
      rgba(82, 196, 204, 0.281) 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
}
</style>
