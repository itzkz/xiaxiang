<template>

<div>


  <van-cell title="个人中心" is-link to="/user/detail" />
  <van-cell title="我创建的队伍" is-link to="/team/create" />
  <van-cell title="我加入的队伍" is-link to="/team/join" />
</div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";


import {getCurrentUser} from "../interface/user.ts";


let user = ref();
onMounted(async () => {
  const res =  await getCurrentUser()
    user.value = res?.data
})

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