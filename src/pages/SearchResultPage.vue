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
      showToast("请求成功")
      console.log(userList,"用户列表")
    }
  } catch (error) {
    console.error('/user/search/tags error', error);
    showToast('请求失败');
  }
});

</script>

<template>

  <van-empty image="search" description="未查询到用户" v-if="!userList ||userList.length < 1"/>
  <UserCardList :user-list="userList" :loading="true" />
</template>

<style scoped>

</style>


