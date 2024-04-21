<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

const userList = ref<UserType[]>([]);
const loading = ref(false);
const isMatchMode = ref(false);

const parseTags = (user: UserType) => {
  if (user.tags) {
    try {
      user.tags = JSON.parse(user.tags as any);
    } catch (error) {
      console.error("Error parsing tags:", error);
    }
  }
};

const loadData = async (pageNum: any) => {
  loading.value = true;
  try {
    //匹配相似用户模式
    if (isMatchMode.value) {
      const num = 100;
      const res = await myAxios.get('user/match', {params: {num}});
      userList.value = res?.data || [];
      //推荐模式
    } else {
      const res = await myAxios.get('user/recommend', {params: {pageSize: 16, pageNum: pageNum}});
      userList.value = res?.data?.records || [];
      totalItems.value = res?.data?.total || 0; // 更新总条目数
    }
    userList.value.forEach(parseTags);
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    loading.value = false;
  }

};
const currentPage = ref(1); // 当前页码
const totalItems = ref(0); // 总条目数


const doChange = (page: any) => {
  loadData(page);
};
watchEffect(() => {
  loadData(currentPage.value);
});
// 在组件挂载时加载初始数据
onMounted(() => {
  loadData(currentPage.value);
});
const onRefresh =() => {
  loadData(currentPage.value)
}

</script>

<template>
  <van-cell center title="相似用户">
    <template #right-icon>
      <van-switch v-model="isMatchMode"/>
    </template>
  </van-cell>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <user-card-list :user-list="userList" :loading="loading"/>
    </van-pull-refresh>
  <van-empty image="search" description="暂无用户" v-if="!loading && userList.length < 1"/>
  <van-pagination v-if="userList.length >=1"
      v-model="currentPage"
      :total-items="totalItems"
      :show-page-size="4"
      @change="doChange"
      force-ellipses
  />
</template>

<style scoped>
/* 可以添加一些样式 */
</style>
