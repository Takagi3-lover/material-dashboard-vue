/**
* @Author 王宇轩
* @Date 2022年09月18日 18:57
* @Description 个人中心页面
*/

<template>
  <div id="building">
    <!--    个人主页顶部部分信息展示-->
    <div class="PersonTop">
      <!--      设置一个头像-->
      <div class="PersonTop_img">
        <img :src=this.avatar class="user-v-img" alt="用户头像"/>
      </div>

      <!--      头像右侧介绍-->
      <div class="PersonTop_text">
        <div class="user_text">
          <!--          自定义的用户名-->
          <div class="user_name">
            <span> {{ nickname }} </span>
          </div>
          <!--          身份标识，普通用户、pro用户等-->
          <div class="user-v" v-if="v>0">
            <img src="@/assets/img/pro.png" class="user-v-img" alt="身份标识"/>
            <span class="user-v-font">高级用户</span>
          </div>
          <div class="user-v" v-else>
            <span class="user-v-font">普通用户</span>
          </div>
          <!--          个性签名-->
          <!--          //  点击编辑后，<span> 变成输入框，点击保存后，变回<span> -->
          <div class="user_signature">
            <span v-if="!isEditDesign"> {{ design }}</span>
            <el-input v-else v-model="design" placeholder="请输入个性签名"></el-input>
          </div>
          <!--          信息编辑按钮-->
          <div class="user_button">
            <el-button
                class="el-icon-edit"
                type="primary"
                size="mini"
                plain
                @click="edit"
            >{{ buttonMsg }}
            </el-button
            >

            <el-button
                class="el-icon-back"
                type="success"
                size="mini"
                plain
                @click="backHome"
            >返回
            </el-button>
          </div>
        </div>

        <!--        用户右侧数据显示-->
        <div class="user_num">
          <div>
            <div class="num_number">{{ num }}</div>
            <span class="num_text">预测次数</span>
          </div>
          <div>
            <div class="num_number">{{ passRate }}</div>
            <span class="num_text">软件通过率</span>
          </div>
          <div>
            <div class="num_number">{{ lastTime }}</div>
            <span class="num_text">最后使用时间</span>
          </div>
        </div>
      </div>
    </div>

    <!--个人信息展示部分-->
    <div class="person_body">
      <div class="person_body_left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span class="person_body_list" style="border-bottom: none">个人中心</span>
          </div>
          <el-menu
              router
              active-text-color="#00c3ff"
              class="el-menu-vertical-demo">
            <el-menu-item
                index="/personal/info">
              <i class="el-icon-user"></i>
              <span slot="title">个人简介</span>
            </el-menu-item>
            <el-menu-item
                index="/personal/VIP">
              <i class="el-icon-medal"></i>
              <span slot="title">高级用户</span>
            </el-menu-item>
            <el-menu-item
                index="/personal/changeEmail">
              <i class="el-icon-message"></i>
              <span slot="title">换绑邮箱</span>
            </el-menu-item>
            <el-menu-item
                index="/personal/revisePassword">
              <i class="el-icon-lock"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
      <div class="person_body_right">
        <router-view></router-view>
      </div>
    </div>
    <personal-dia ref="dia" @flesh="load"/>
  </div>
</template>

<script>

import PersonalDia from "@/components/PersonalDia";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Personal",
  components: {
    PersonalDia
  },
  data() {
    return {
      buttonMsg: "编辑",
      isEditDesign: false,
      avatar: require("@/assets/img/Ava.jpg"),
      nickname: "Ava",
      design: "关注...也不是不可以啦！",
      num: 13,
      passRate: 0.9,
      lastTime: "2020-05-20 12:00:00",
      v: 3,
      email: ""
    };
  },
  created() {
    this.load();
  },
  methods: {
    openDia() {
      this.$refs.dia.open();
    },
    edit() {
      //  点击编辑后，<span> {{ design }}</span>变成输入框，点击保存后，变回<span> {{ design }}</span>
      if (this.buttonMsg === "编辑") {
        this.buttonMsg = "保存";
        this.isEditDesign = true;
      } else {
        this.buttonMsg = "编辑";
        this.isEditDesign = false;
        //  TODO 将编辑得到的新个性签名发送到后端
        this.request.post("/updateDesign", {
          design: this.design,
          email: this.email
        }).then(res => {
          console.log(res);
        });
      }
    },
    load() {
      this.email = sessionStorage.getItem("email");
      this.request.post('/getHeader', {
        email: this.email
      }).then(res => {
        if (res.code === 200) {
          this.nickname = res.nickname
          this.design = res.design
          this.num = res.num
          this.passRate = res.passRate
          this.lastTime = res.lastTime
          this.v = res.v_level

          //  获取用户头像
          this.avatar = 'http://localhost:9090/getIcon?email=' + sessionStorage.getItem('email')

        } else {
          this.$message.error('获取用户头像失败Personal')
        }
      })
    },
    backHome() {
      this.$router.push("/mainPage");
    },
  },
};
</script>

<style scoped>

.PersonTop {
  width: 1000px;
  height: 140px;
  padding-top: 20px;
  background-color: white;
  margin-top: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 5px;
  filter: opacity(0.8);
}

.PersonTop_img {
  width: 150px;
  height: 120px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.PersonTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 50%;
  height: 100%;
  line-height: 30px;
}

.user_name {
  font-weight: bold;
}

.user-v {
  margin-bottom: -5px;
}

.user-v-img {
  width: 15px;
  height: 15px;
}

.user-v-font {
  font-size: 15px;
  color: #00c3ff;
}

.user_signature {
  font-size: 14px;
  color: #999;
}

.user_num {
  width: 46%;
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num > div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 150px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 18px;
  color: #333;
}

.el-menu-item > span {
  font-size: 16px;
  color: #999;
}

/*下面部分样式*/
.person_body {
  width: 1000px;
  margin-top: 210px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  filter: opacity(0.9);
}

.person_body_left {
  width: 27%;
  height: 600px;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
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

.person_body_right {
  width: 70%;
  /* height: 500px; */
  border-radius: 5px;
  background-color: white;
  height: 502px;
}

.box-card {
  height: 500px;
}

#building {
  background: url("@/assets/img/personalPage.png");
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-size: 100% 100%;
  overflow: hidden;
  /*  铺满整个界面*/
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#returnSpan {
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 0;
  width: 30px;
  height: 30px;

}
</style>
