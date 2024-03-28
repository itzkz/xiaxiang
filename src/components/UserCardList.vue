<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});

</script>

<template>
  <van-card loading="props.loading"
            v-for="user in props.userList"
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