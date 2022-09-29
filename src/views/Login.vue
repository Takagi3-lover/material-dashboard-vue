/**
* @Author 王宇轩
* @Date 2022年09月16日 18:57
* @Description 用户登录界面 包含登陆、注册、找回密码三个功能跳转按钮
*/
<template>
  <div class="wrapper">
    <div class="login_box">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b style="font-size: 20px">软件缺陷分析与预测系统</b></div>

      <!--      登陆表单，包含输入账号密码文本框和登陆，注册 找回密码三个功能选项-->
      <el-form class="login_form" :model="user" :rules="loginRules" ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"
                    placeholder="用户名/邮箱/手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="user.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0;text-align: center;">
          <!-- 包含登陆、注册、找回密码三个功能按钮，样式要美观-->
          <el-button type="primary" @click="handleLogin">登陆</el-button>
          <el-button type="success" @click="$router.push('/register')">注册</el-button>
          <el-button type="warning" @click="$router.push('/findPassword')">找回密码</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>

export default {
  //禁用eslint
  /* eslint-disable */
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'},
          {pattern: /^[a-zA-Z\d@.]{10,20}$/, message: '邮箱只能包含字母、数字、@和.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
          {pattern: /^[a-zA-Z\d@.]{6,20}$/, message: '密码只能包含字母、数字、@和.', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    handleLogin() {
      //  TODO: 登录 验证用户名密码，发送给后端，如存在该用户，则跳转到首页，否则提示错误
      this.$refs.userForm.validate((errorMsg) => {
        console.log(errorMsg)
        if (errorMsg) {
          this.request.post('/login', this.user).then(res => {
            if (res === 200) {
              this.$message.success('登陆成功');
              this.$router.push('/mainPage');
            } else {
              this.$message.error(res.data.msg);
            }
          })
        } else {
          this.$message.error('请输入正确的用户名和密码');
        }
      })
    }
  }
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

.login_box {
  width: 400px;
  height: 300px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #d3d3d3;
  box-shadow: 0px 36px 54px -12px rgb(0 0 0);
  background-color: rgba(255, 255, 255, 0.7);
}

.login_form {
  margin-top: 20px;
  padding: 0 25px;
}
</style>
