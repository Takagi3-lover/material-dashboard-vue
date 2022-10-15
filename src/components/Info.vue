/**
* @Author 王宇轩
* @Date 2022年09月18日 19:58
* @Description 用户个人简介，用于静态的信息展示
*/

<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="openDia">操作</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            头像
          </template>
          <el-image class="img" :src=this.avatar alt=""/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            昵称
          </template>
          {{ nickname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-message"></i>
            邮箱
          </template>
          {{ email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            电话
          </template>
          {{ mobilePhoneNumber }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            <i class="el-icon-female"></i>
            性别
          </template>
          <el-tag size="small">{{ sex }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-magic-stick"></i>
            个性签名
          </template>
          {{ design }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            地区
          </template>
          {{ area }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date"></i>
            注册日期
          </template>
          {{ createDate }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Info",

  data() {
    return {
      avatar: String,
      email: String,
      mobilePhoneNumber: String,
      area: String,
      createDate: Number,
      nickname: String,
      sex: String,
      design: String,
    };
  },
  created() {
    this.email = sessionStorage.getItem('email');
    this.request.post('/getPersonInfo', {email: this.email}).then(res => {
      if (res.code === 200) {
        this.email = res.email
        this.mobilePhoneNumber = res.mobilePhoneNumbers
        this.area = res.area
        this.createDate = res.createDate
        this.nickname = res.nickname
        if (res.sex === 0) {
          this.sex = '女'
        } else {
          this.sex = '男'
        }
        this.design = res.design


        //  获取用户头像
        this.avatar = 'http://localhost:9090/getIcon?email=' + this.email

      } else {
        this.$message.error("信息拉取失败info")
      }
    }).catch(() => {
      this.$message({
        message: '网络错误info',
        type: 'error'
      });
    })

  },
  // mounted() {
  //   this.load();
  // },
  methods: {
    load() {
      this.email = "12306@gmail.com"
      this.mobilePhoneNumber = "12342333"
      this.area = "北京"
      this.createDate = "2021-09-18"
      this.nickname = "Avava AvA"
      this.design = "关注...也不是不可以啦！"
      this.sex = "女"
    },
    openDia() {
      //  调用父组件中的openDia方法
      this.$parent.openDia()
    }
  }
};
</script>

<style scoped>
.img {
  width: 80px;
  height: 80px;
}
</style>
