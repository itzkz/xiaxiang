<template>

  <div style="height: 550px; padding-top:60px;  margin-left: -20px;;min-width: 380px" >
  <div class="center" style="text-align: center;">
    <img alt="遐想" class="img" :src="iKun" style="width: 300px" height="180px">
  </div>
    <van-row justify="center">
      <h3>"遐想 —— 寻找志同道合的朋友"</h3>
    </van-row>
    <div style="margin: 14px" >
  <van-form @submit="onSubmit"  >
    <van-field
        v-model="userAccount"
        :rules="[{ required: true, message: '请填写账号!' }]"
        label="账号"
        name="账号"
        placeholder="请填写账号"
    />
    <van-field
        v-model="userPassword"
        :rules="[{ required: true, message: '请填写密码!' }]"
        label="密码"
        name="密码"
        placeholder="请填写密码"
        type="password"
    />
    <van-field
        v-model="checkPassword"
        :rules="[{ required: true, message: '请确认密码!' }]"
        label="确认密码"
        name="确认密码"
        placeholder="确认密码"
        type="password"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-cell title="" to="/user/login" value="已有账号？点击登录"></van-cell>
    </div>
  </van-form>
    </div>
</div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {iKun} from "../constants/teamStatusEnum.ts";

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post("user/register", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value
  })
  if (res.code === 0) {
    showToast("注册成功");
    setTimeout(function() {
      window.location.replace('/user/login');
    }, 1000); // 延迟3秒跳转到登录页面
  } else {
    showToast("注册失败"+ "   " + res.description);
  }
};

</script>
<style>
</style>