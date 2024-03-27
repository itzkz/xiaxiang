<script setup>
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {onMounted} from "vue";
import {showToast} from "vant";
import qs from 'qs';
import {ref} from "vue";

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
    const userListData = response?.data?.data;
    if (userListData) {
      userListData.forEach(user => {
        if (user.tags && typeof user.tags === 'string') {
          user.tags = JSON.parse(user.tags);
        }
      });
      userList.value = userListData;

    }
  } catch (error) {
    console.error('/user/search/tags error', error);
    showToast('请求失败');
  }
});
</script>

<template>
  <van-empty image="search" description="未查询到用户" v-if="!userList ||userList.length < 1"/>
  <van-card
      v-for="user in userList"
      :desc="user.username"
      :title="user.profile"
      :thumb="user.avatarurl"

  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" :key="tag"
               style="margin-top: 8px; margin-right: 8px">
        {{ tag }}
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


