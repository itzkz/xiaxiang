<script setup lang="ts">
import {UserType} from "../models/user";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});
const loading = ref(false);
// 使用一个对象来保存每个用户的关注状态
const followStatus = ref({});
const follow = async (user: any) => {

  const res = await myAxios.post("/user/follow", {
        followId: user.id,
      }
  );
  if (res.code === 0) {
    showToast("关注成功")
    followStatus.value[user.id]= res.data.follow; // 更新该用户的关注状态为 true
  } else {
    showToast("关注失败" + " " + res.description)
  }
}

const discard = async (user: any) => {
  const res = await myAxios.post("/user/discard", {
    followId: user.id,
  });
  if (res.code === 0) {
    showToast("取关成功")
    followStatus.value[user.id] = res.data.follow; // 更新该用户的关注状态为 false
  } else {
    showToast("取关失败" + " " + res.description)
  }
}
</script>

<template>
  <van-skeleton title avatar :row="3" :loading="loading" v-for="user in props.userList">
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
        <van-button size="mini" @click="follow(user)" v-if="!followStatus[user.id]"  type="primary">关注</van-button>
        <van-button size="mini" @click="discard(user)" v-if="followStatus[user.id]" type="danger">取关</van-button>
        <van-button size="mini">联系</van-button>
      </template>
    </van-card>
  </van-skeleton>

</template>

<style scoped>

</style>