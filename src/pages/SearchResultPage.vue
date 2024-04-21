<script setup>
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {onMounted} from "vue";
import {showToast} from "vant";
import qs from 'qs';
import {ref} from "vue";
import UserCardList from "../components/UserCardList.vue";

const router = useRoute()
const {tags} = router.query
const userList = ref([]);
const loading = ref(false);
onMounted(async () => {
  try {
    const response = await myAxios.get('/user/search/tags', {
      params: {
        tagNameList: tags
      },
      paramsSerializer: params => {
        return qs.stringify(params, {indices: false})
      }
    });
    // console.log('/user/search/tags succeed', response);
    const userListData = response?.data;
    if (userListData) {
      userListData.forEach(user => {
        if (user.tags && typeof user.tags === 'string') {
          user.tags = JSON.parse(user.tags);
        }
      });
      userList.value = userListData;
      console.log(userList,"用户列表")
    }
  } catch (error) {
    console.error('/user/search/tags error', error);
    showToast('请求失败');
  }
});
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
  }, 1000);
};
</script>

<template>

  <van-empty image="search" description="未查询到用户" v-if="!userList ||userList.length < 1"/>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <user-card-list :user-list="userList" :loading="loading"/>
  </van-pull-refresh>
</template>

<style scoped>

</style>


