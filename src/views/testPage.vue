/**
* @Author 王宇轩
* @Date 2022年09月21日 17:40
* @Description
*/

<template>
  <h1>
    {{ msg }}
    <el-button @click="test">
      按钮
    </el-button>
  </h1>
</template>

<script>

export default {
  name: "testPage",
  data() {
    return {
      msg: "测试页面",
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    test() {
      console.log("test")
      this.request.post("/hello").then((res) => {
        console.log("succ")
      })
    },
  },
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  /*background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);*/
  overflow: hidden;
  /*  铺满整个界面*/
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("@/assets/img/bg2.png");
  background-size: 100% 100%;
}

.login-box {
  width: 100%;
  height: 100%;
  left: auto;
  border-radius: 2px;
  position: absolute;
  /*!*border: 1px solid #d3d3d3;*!*/
  /*box-shadow: 0px 36px 54px -12px rgb(0 0 0);*/
}
</style>