<script setup>
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {onMounted, ref} from "vue";
import {showToast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";

const router = useRoute()


const teamList = ref([]);

onMounted(async () => {
  const res = await myAxios.get("team/list/my/create")
  if (res.code ===0){
    showToast("获取成功")
    teamList.value =res.data
  }else
    showToast("获取失败")
})

</script>

<template>

  <van-empty image="search" description="未查询到用户" v-if="!teamList ||teamList.length < 1"/>
  <TeamCardList :team-list="teamList" :loading="true" />
</template>


<style scoped>

</style>


