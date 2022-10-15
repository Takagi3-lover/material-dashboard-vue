/**
* @Author 王宇轩
* @Date 2022年09月20日 9:10
* @Description
*/
<template>
  <div style="height: 100%">
      <el-menu
          class="el-menu-vertical-demo"
          background-color="rgb(41, 41,41)"
          text-color="rgb(255,255,255)"
          active-text-color="rgb(35, 122, 179)">
              <el-menu-item><i class="el-icon-location"></i>缺陷预测</el-menu-item>
              <el-menu-item><i class="el-icon-document"></i>训练模型(未开放)</el-menu-item>
      </el-menu>
  </div>
</template>


<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  data() {
    return {}
  },
}
</script>

<style>
/*解决收缩菜单文字不消失问题*/
.el-menu--collapse span {
  visibility: hidden;
}
#myAside{
  background: url("@/assets/img/long_bg2.png");
  background-size: 100% 100%;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>