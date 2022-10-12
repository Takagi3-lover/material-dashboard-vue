<template>
  <div class="wrapper">
    <div style="height: 100%;width: 100%">
      <el-container style="height: 100%">
        <el-header style="margin: 0;padding: 0;line-height: 60px">
          <Header/>
        </el-header>

        <el-container>
          <el-aside width="200px">
            <Aside/>
          </el-aside>
          <el-main style="padding: 0;margin: 0">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside";

export default {
  name: 'MainPage',
  components: {Header, Aside},
  props: {
    msg: String
  },
}
</script>
<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;

}

body > .el-container {
  margin-bottom: 40px;
}

.wrapper {
  height: 100vh;
  overflow: hidden;
  /*  铺满整个界面*/
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}


</style>
