<template>

  <div style="padding-top:60px;  margin-left: -20px;;min-width: 380px">
  <div class="center" style="text-align: center;">
    <img alt="遐想" class="img" :src="iKun" style="width: 300px" height="180px">  </div>
    <van-row justify="center">
      <h3>"遐想 —— 寻找志同道合的朋友"</h3>
    </van-row>
    <div style="margin: 14px;padding-top: 20px">
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
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-cell title="" to="/user/register" value="还没有账号？点击注册"></van-cell>
    </div>
  </van-form>
    </div>
</div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {iKun} from "../constants/teamStatusEnum.ts";

const route = useRoute();
const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post("user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  if (res.code === 0) {
    showToast("登录成功");
    if (res.data.tagsisnoll){
      await router.replace("/user/tags")
    }else {
      const redirect = route.query?.redirect as string ?? '/';
      window.location.replace(redirect);
    }
  } else {
    showToast("登录失败"+"  "+ res.message);
  }
};

</script>
<style>
</style>