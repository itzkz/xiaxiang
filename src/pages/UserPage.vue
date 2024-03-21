<template>
  <van-cell title="头像" is-link @click="toEdit('useravatar',user.useravatar,'头像')">
    <img :src="user.useravatar" alt="" style="height: 46px">
  </van-cell>
  <van-cell title="昵称" is-link :value="user.username" @click="toEdit('userName',
user.username, '昵称')"/>
  <van-cell title="账号" :value="user.useraccount"/>
  <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender',
user.gender, '性别')"/>
  <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone', user.phone,
'电话')"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email', user.email,
'邮箱')"/>
  <van-cell title="注册时间" :value="user.gmtCreate"/>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const user = ref({
  id: 1,
  username: 'zkz',
  useraccount: 'itzkz',
  gender: '男',
  phone: '12345',
  email: '11111@qq.com',
  useravatar: "https://img.zcool.cn/community/0118e45bf7bda7a80121ab5dd5b8d8.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp",
  gmtCreate: new Date().toDateString()
})
const router = useRouter();
const toEdit = (editKey: string, currentValue: string, editName: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      currentValue,
      editName
    }
  })
}
</script>
<style scoped>
</style>