/**
* @Author 王宇轩
* @Date 2022年09月18日 20:12
* @Description 实现换绑邮箱功能的界面
*/

<template>
  <div>
    <!--    换绑邮箱页面，分步骤包括发送验证码，邮箱输入，换绑成功三个步骤-->
    <div
        style="margin-left: 160px ;margin-right: 200px;margin-top: 100px; background-color: #fff; width: 400px; height: 300px;
        padding: 0; border-radius: 10px">

      <el-steps :active="active" align-center finish-status="success">
        <el-step title="身份验证" icon="el-icon-user"></el-step>
        <el-step title="邮箱重置" icon="el-icon-edit"></el-step>
        <el-step title="重置成功" icon="el-icon-star-off"></el-step>
      </el-steps>

      <el-divider style="height: 1px"></el-divider>

      <el-form :model="user" :rules="changeEmailRule" ref="userForm">
        <div v-show="active==0">
          <el-form-item prop="email">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.email"
                      placeholder="邮箱"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" v-model="user.code"
                      placeholder="验证码">
              <!--            发送验证码的按钮，位置靠右-->
              <el-button slot="append" :disabled="ifSend" type="primary" @click="sendCode">{{ statusMsg }}</el-button>
            </el-input>
          </el-form-item>

          <!--        按钮组件-->
          <el-form-item style="margin: 10px 0;text-align: center;">
            <el-button type="success" @click="next">下一步</el-button>
            <el-button type="warning" @click="resetText">重置</el-button>
          </el-form-item>
        </div>
        <div v-show="active==1">
          <el-form-item prop="email">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                      v-model="user.email" placeholder="新邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="confirmEmail">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                      v-model="user.email_new" placeholder="确认邮箱"></el-input>
          </el-form-item>
          <el-form-item style="margin: 10px 0;text-align: center;">
            <el-button type="success" @click="prev">上一步</el-button>
            <el-button type="warning" @click="next">下一步</el-button>
          </el-form-item>
        </div>
        <div v-show="active==2">
          <el-form-item style="margin: 10px 0;text-align: center;">
            <div style="font-size: 16px;margin: 10px">-^0^-邮箱重置成功，请重新登录！</div>
            <el-button type="primary" @click="$router.push('/login')"
                       style="margin: 10px">返回登录
            </el-button>
          </el-form-item>

        </div>

      </el-form>

    </div>

  </div>
</template>

<script>
export default {
  name: "changeEmail",
  data() {
    return {
      //当前所属的步骤
      active: 0,
      statusMsg: '发送验证码',
      ifSend: false,//是否发送验证码
      //存储找回密码可能用到的信息，包括邮箱，电话，密码，验证码等
      user: {
        email: '',
        email_new: '',
        phone: '',
        code: '',
      },
      changeEmailRule: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'},
          {pattern: /^[a-zA-Z\d@.]{10,20}$/, message: '邮箱只能包含字母、数字、@和.', trigger: 'blur'}
        ],
        email_new: [
          {required: true, message: '请再次输入邮箱', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.user.email) {
                callback(new Error('两次输入邮箱不一致!'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    //重置表单
    resetText() {
      this.$refs.userForm.resetFields();
    },
    //【邮箱】-->【点击获取邮箱验证码】（校验邮箱格式是否正确；若正确，则后端判断该邮箱是否已注册。
    // 只有已注册的邮箱，系统才会发送邮箱验证码，否则显示错误信息）-->【前往邮箱，查收验证码并输入】-->【点击下一步】
    // (向后端提交邮箱和验证码，后端判断是否匹配，若匹配则身份验证成功，进入重置密码页面，否则显示错误信息)
    //发送验证码
    sendCode() {
      let ifCountStart = false;
      //校验邮箱格式是否正确，若正确，则后端判断该邮箱是否已注册
      this.$refs.userForm.validateField('email', (errorMsg) => {
        if (!errorMsg) {
          //向后端发送请求，发送验证码
          this.request.post('/sendCode',
              {
                mail: this.user.email
              }).then(res => {
            if (res === 200) {
              this.$message({
                message: '验证码发送成功，请前往邮箱查收',
                type: 'success'
              });
              this.ifSend = true;
              ifCountStart = true;
            } else {
              this.$message({
                message: "验证码发送失败，请稍后再试",
                type: 'error'
              });
            }
          })
        } else {
          this.$message({
            message: '邮箱格式不正确',
            type: 'error'
          });
        }
      })

      //  若成功发送验证码，则开始倒计时，一分钟后可以再次发送
      if (ifCountStart) {
        let count = 120;
        let timer = setInterval(() => {
          if (count > 0 && count <= 120) {
            count--;
            this.statusMsg = count + '秒';
          } else {
            clearInterval(timer);
            this.statusMsg = '发送验证码';
          }
        }, 1000)
      }
    },
    //下一步
    next() {
      //如果当前处在步骤第一步，则在进入下一步骤之前，先校验邮箱和验证码是否正确
      if (this.active === 0) {
        this.$refs.userForm.validate((errorMsg) => {
          console.log(errorMsg);
          if (errorMsg) {
            //向后端提交邮箱和验证码，后端判断是否匹配，若匹配则身份验证成功，进入重置密码页面，否则显示错误信息
            this.request.post('/identify', this.user).then(res => {
              if (res.code === 200) {
                this.active++;
              } else {
                this.$message({
                  message: "验证码错误",
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写正确的邮箱和验证码',
              type: 'error'
            });
          }
        })
      } else if (this.active === 1) {
      //  首先校验新旧邮箱是否正确，并且一致，然后向后端提交新密码，后端判断是否修改成功，若成功则显示成功信息，否则显示错误信息
        this.$refs.userForm.validate((errorMsg) => {
          console.log(errorMsg)
          if (errorMsg) {
            this.request.post('/updateEmail', this.user).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: "邮箱修改成功",
                  type: 'success'
                });
                this.active++;
              } else {
                this.$message({
                  message: "邮箱修改失败",
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写正确的邮箱',
              type: 'error'
            });
          }
        })

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