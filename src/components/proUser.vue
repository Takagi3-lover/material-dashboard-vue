/**
* @Author 王宇轩
* @Date 2022年09月18日 20:11
* @Description 实现用户充值提升效率的界面，从属于个人中心
*/

<template>
  <div style="padding: 5px;margin: 5px auto">
    <!--    标题简介-->
    <div style="margin: 5px auto;font-size: large;text-align: center">
      Pro用户高速通道
    </div>
    <el-divider style="height: 1px"></el-divider>


    <div style="margin: 5px;text-align: center" class="continuousRecharge">
      <el-badge value="6.3折" class="item">
        <el-button @click="change(1)" style="width: 120px;height: 100px">
          <p style="font-size: 14px">连续包年</p>
          <div style="font-size: 25px">￥148</div>
          <p class="myp">￥233</p>
        </el-button>
      </el-badge>

      <el-badge value="6.6折" class="item">
        <el-button @click="change(2)" style="width: 120px;height: 100px">
          <p style="font-size: 14px">连续包季节</p>
          <div style="font-size: 25px">￥45</div>
          <p class="myp">￥68</p>
        </el-button>
      </el-badge>
      <el-badge value="6折" class="item">
        <el-button @click="change(3)" style="width: 120px;height: 100px" >
          <p style="font-size: 14px">连续包月</p>
          <div style="font-size: 25px">￥15</div>
          <p class="myp">￥25</p>
        </el-button>
      </el-badge>
    </div>
    <div style="margin: 5px;text-align: center" class="singleRecharge">
      <el-badge value="6.3折" class="item">
        <el-button @click="change(4)" style="width: 120px;height: 100px">
          <p style="font-size: 14px">年度会员</p>
          <div style="font-size: 25px">￥148</div>
          <p class="myp">￥233</p>
        </el-button>
      </el-badge>
      <el-badge value="10折" class="item" hidden="hidden">
        <el-button @click="change(5)" style="width: 120px;height: 100px" >
          <p style="font-size: 14px">季度会员</p>
          <div style="font-size: 25px">￥68</div>
        </el-button>
      </el-badge>
      <el-badge value="10折" class="item" hidden="hidden">
        <el-button @click="change(6)" style="width: 120px;height: 100px">
          <p style="font-size: 14px">月度会员</p>
          <div style="font-size: 25px">￥25</div>
        </el-button>
      </el-badge>
    </div>
    <div>
      <el-divider style="height: 1px"></el-divider>
      <!--用户需扫描展示出的二维码图片进行支付-->
      <div style="margin: 5px auto;text-align: center">
        <!--        展示二维码图片-->
        <img :src="QRcodeSrc" alt="二维码图片" style="width: 120px;height: 130px;" align="middle">
        <el-popconfirm
            title="本网站依靠个人维护，如果您觉得本网站对您有帮助，欢迎您的捐赠，谢谢！"
            confirm-button-text="已捐赠"
            cancel-button-text="返回"
            @confirm="confirm"
        >
          <el-button slot="reference" type="primary" @click="pay" style="width: 100px;margin-left: 100px">我已支付
          </el-button>
        </el-popconfirm>
      </div>

      <el-divider style="height: 1px"></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "proUser",
  data() {
    return {
      QRcodeSrc: require("@/assets/img/payQRcode.jpg"),
      form: {
        v_level: 0,
        email: '',
      },
    }
  },
  methods: {
    change(type) {
      this.form.v_level = type;
    },
    confirm() {
      this.form.email=sessionStorage.getItem("email");
      //像后端传回form数据
      this.request.post("/charge", this.form).then(res => {
        if (res.code === 200) {
          //调用Personal组件中的load方法，重新加载用户信息
          this.$parent.load();
          this.$message({
            message: '感谢您的支持！pro用户高速通道已开通！',
            type: "success",
          });
        } else {
          this.$message({
            message: "当前服务器繁忙，请稍后再试！",
            type: "error",
          });
        }
      });
    },
  }
}
</script>

<style scoped>
.myp {
  font-size: 14px;
  margin: 0;
  padding: 0;
  text-decoration: line-through;
}

.item {
  margin-top: 10px;
  margin-right: 60px;

}
</style>