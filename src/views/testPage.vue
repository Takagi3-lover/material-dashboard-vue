/**
* @Author 王宇轩
* @Date 2022年09月21日 17:40
* @Description
*/

<template>
  <div>
    {{ msg }}
    <a href="http://localhost:9090/getFile">
      <el-button @click="test">
        按钮
      </el-button>
    </a>

    <div>
      <el-button @click="getIcon">
      获取图片
      </el-button>
      <el-image
        style="width: 100px; height: 100px"
        :src="imgUrl"
        fit="cover"
      />
    </div>
  </div>
</template>
<script>
// 接口信息如下：
export function getImage (params) {
  return this.request({
    url: 'http://localhost:9090/getIcon',// 获取图片的接口的地址
    method: 'get',
    params,
    responseType:'blob'
  })
}
export default {
  name: "testPage",
  data() {
    return {
      msg: "测试页面",
      imgUrl: "",
      username: "wangyuxuan",
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    test() {
      console.log("test")
      //请求getFile接口下载文件
      this.request.get('/getFile').then(res => {
        console.log(res);
        this.$message({
          message: '下载成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err);
      })
    },
    getIcon(){
      this.imgUrl='http://localhost:9090/getIcon?username=wangyuxuan'
      // getImage({'username':this.username}).then(res=>{
      //   // 注意：res是Blob对象
      //   if(res){
      //     // 1方式
      //     const myBlob = new window.Blob([res], {type: 'image/jpg'})
      //     this.imgUrl = window.URL.createObjectURL(myBlob)
      //   }
      // })
    }
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