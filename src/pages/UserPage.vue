<template>

<div>


  <van-cell title="个人中心" is-link to="/user/detail" />
  <van-cell title="我创建的队伍" is-link to="/team/create" />
  <van-cell title="我加入的队伍" is-link to="/team/join" />
  <van-cell title="我的关注" is-link to="/user/follow" />
  <van-cell title="我的粉丝" is-link to="/user/fans" />
</div>
  <div style="margin-top: 300px">
  <van-button type="primary" size="large"  @click="doLogOut">退出登录</van-button>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../interface/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import {showToast} from "vant";

const router = useRouter();
let user = ref();
onMounted(async () => {
  const res =  await getCurrentUser()
    user.value = res?.data
})
const doLogOut=async ()=>{
  const res = await myAxios.post("/user/logout")
  if (res.code===0){
    await router.replace('/user/login')
  }else {
    showToast("退出失败,请重试!")
  }
}
//
// const user = ref({
//   id: 1,
//   username: 'zkz',
//   useraccount: 'itzkz',
//   gender: '男',
//   phone: '12345',
//   email: '11111@qq.com',
//   useravatar: "https://img.zcool.cn/community/0118e45bf7bda7a80121ab5dd5b8d8.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp",
//   gmtCreate: new Date().toDateString()
// })
</script>
<style scoped>
</style>