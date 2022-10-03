/**
* @Author 王宇轩
* @Date 2022年09月18日 21:55
* @Description 用于实现用户修改密码的界面 从属于用户个人中心
*/

<template>
  <div
      style="margin-left: 160px ;margin-right: 200px;margin-top: 100px; background-color: #fff; width: 400px; height: 300px;
        padding: 0; border-radius: 10px">

    <el-steps :active="active" align-center finish-status="success">
      <el-step title="身份验证" icon="el-icon-user"></el-step>
      <el-step title="密码重置" icon="el-icon-edit"></el-step>
      <el-step title="重置成功" icon="el-icon-star-off"></el-step>
    </el-steps>

    <el-divider style="height: 1px"></el-divider>

    <el-form :model="user" :rules="findPswRules" ref="userForm">
      <div v-show="active==0">
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" v-model="user.password"
                    placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" v-model="user.confirmPassword"
                    placeholder="确认密码">
          </el-input>
        </el-form-item>

        <!--        按钮组件-->
        <el-form-item style="margin: 10px 0;text-align: center;">
          <!-- 包含登陆、注册、找回密码三个功能按钮，样式要美观-->
          <el-button type="success" @click="next">下一步</el-button>
          <el-button type="warning" @click="resetText">重置</el-button>
        </el-form-item>
      </div>
      <div v-show="active==1">
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="user.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="user.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0;text-align: center;">
          <el-button type="success" @click="prev">上一步</el-button>
          <el-button type="warning" @click="next">下一步</el-button>
        </el-form-item>
      </div>
      <div v-show="active==2">
        <el-form-item style="margin: 10px 0;text-align: center;">
          <div style="font-size: 16px;margin: 10px">-^0^-新密码修改成功，请重新登录！</div>
          <el-button type="primary" @click="$router.push('/login')"
                     style="margin: 10px">返回登录
          </el-button>
        </el-form-item>

      </div>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "revisePassword",
  created() {
    this.user.email = JSON.parse(sessionStorage.getItem("email"));
  },
  data() {
    return {
      active: 0,
      user: {
        email: '',
        code: '',
        password: '',
        confirmPassword: ''
      },
      findPswRules: {
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '验证码不能为空', trigger: 'blur'},
          {min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
          //  密码必须同时包含数字、大小写字母，长度在6到20个字符
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/,
            message: '密码必须同时包含数字,大、小写字母，长度在6到20个字符',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
        ]
      },
      ifSend: false,
      statusMsg: '发送验证码'
    }
  },
  methods: {
    //重置表单
    resetText() {
      this.$refs.userForm.resetFields();
    },
    //下一步
    next() {
      //  如果active=0,则要密码和确认密码这两个字段符合规则
      if (this.active === 0) {
        if (this.user.password !== this.user.confirmPassword) {
          this.$message({
            message: '两次密码不一致',
            type: 'warning'
          });
        } else if (this.user.password === '' || this.user.confirmPassword === '') {
          this.$message({
            message: '密码不能为空',
            type: 'warning'
          });
        } else {
          this.request.post('/updatePassword', this.user).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '密码修改成功',
                type: 'success'
              });
              this.active++;
            } else {
              this.$message({
                message: '密码修改失败',
                type: 'warning'
              });
            }
          })
        }
      } else {
        this.active++;
      }
    },
    //上一步
    prev() {
      this.active--;
    },
  }
}
</script>

<style scoped>
</style>