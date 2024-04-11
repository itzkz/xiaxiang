<script setup lang="ts">
import myAxios from "../plugins/myAxios.ts";


const userList = ref([]);

onMounted(async () => {
  const res = await myAxios.get('user/recommend',{
    params:{
      pageSize:8,
      pageNum:1,
    },

  });
  const userListData = res?.data.records;

  if (userListData) {
    userListData.forEach(user => {
      if (user.tags && typeof user.tags === 'string') {
        try {
          user.tags = JSON.parse(user.tags);
        } catch (error) {
          console.error("Error parsing tags:", error);
        }
      }
    });
    userList.value = userListData;
  }
});


import UserCardList from "../components/UserCardList.vue";
import {onMounted, ref} from "vue";
</script>

<template>

  <UserCardList :user-list="userList" :loading="true"/>
    <van-empty image="search" description="暂无用户" v-if="!userList ||userList.length < 1"/>

</template>


<style scoped>

</style>