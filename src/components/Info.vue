/**
* @Author 王宇轩
* @Date 2022年09月18日 19:58
* @Description 用户个人简介，用于静态的信息展示
*/

<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            头像
          </template>
          <img class="img" src="@/assets/img/Ava.jpg" alt=""/>
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
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.email = "12306@gmail.com"
      this.mobilePhoneNumber = "12342333"
      this.area = "北京"
      this.createDate = "2021-09-18"
      this.nickname="Avava AvA"
      this.design="关注...也不是不可以啦！"
      this.sex="女"
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
