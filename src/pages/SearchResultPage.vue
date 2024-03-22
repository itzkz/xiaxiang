<script setup lang="ts">
import {useRoute} from "vue-router";



const router =useRoute()
const  {tags} =router.query


const mockUser =
    {
      id: 1,
      username: "zkz",
      useraccount: "itzkz",
      avatarurl: "https://tupian.qqw21.com/article/UploadPic/2021-1/202111921572763735.jpg",
      gender: 1,
      profile:"一位爱玩元神 王者 吃鸡 铲铲的GGb",
      phone: "11111111111",
      email: "xxx.@qq.com",
      tags: ["元神","男","二次元","肥仔","农批","铲批"],
      createtime: new Date(),
    }





</script>

<template>

  <van-card v-if=" mockUser.tags.some(tag => tags.includes(tag))"
            :desc="mockUser.profile"
            :title="mockUser.username"
            :thumb="mockUser.avatarurl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in mockUser.tags" style="margin-top: 8px;margin-right: 8px"  >
         {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">关注</van-button>
      <van-button size="mini">匹配队伍</van-button>


    </template>
  </van-card>

</template>

<style scoped>

</style>