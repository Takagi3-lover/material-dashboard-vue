<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  created() {
    window.L2Dwidget
        //对人物的属性配置
        .init({
          pluginRootPath: '../live2dw/', //人物文件夹的位置
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-hijiki/assets/',
          model: {
            jsonPath: '../live2dw/live2d-widget-model-hijiki/assets/hijiki.model.json'
          },

          display: { //人物的属性配置
            position: 'right',
            width: 200,
            height: 400,
            hOffset: 50, // 横向偏移
            vOffset: -100 // 纵向偏移
          },
          mobile: {
            show: true, //是否在移动端展示
            scale: 0.5 //t透明度
          }
        });
  }
}
</script>
<style>
</style>
