<script setup lang="ts">
import {UserType} from "../models/user";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";

const userList = ref<UserType[]>([]);
const loading = ref(false);

// 使用 ref 来存储 followStatus
const followStatus = ref({});

onMounted(async () => {
  await fetchUserList();
})

const fetchUserList = async () => {
  const res = await myAxios.get("/user/list/follow")
  if (res.code === 0) {
    userList.value = res?.data || [];
    userList.value.forEach(parseTags);
  } else {
    showToast("获取列表失败")
  }
}

const parseTags = (user: UserType) => {
  if (user.tags) {
    try {
      user.tags = JSON.parse(user.tags as any);
    } catch (error) {
      console.error("Error parsing tags:", error);
    }
  }
};

const discard = async (user: any) => {
  const res = await myAxios.post("/user/discard", {
    followId: user.id,
  });
  if (res.code === 0) {
    showToast("取关成功")
    // 从 userList 中移除被取关的用户
    userList.value = userList.value.filter(u => u.id !== user.id);
  } else {
    showToast("取关失败" + " " + res.description)
  }
}
</script>

<template>
  <van-skeleton title avatar :row="3" :loading="loading" v-for="user in userList">
    <van-card loading="props.loading"
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
        <van-button size="mini" @click="discard(user)" v-if="!followStatus[user.id]" type="danger">取关</van-button>
        <van-button size="mini">联系</van-button>


      </template>
    </van-card>
  </van-skeleton>
  <van-empty image="search" description="暂无用户" v-if="!loading && userList.length < 1"/>
</template>

<style scoped>

</style>
