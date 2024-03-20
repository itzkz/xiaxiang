<script setup lang="ts">
import {showToast} from "vant";
import {useRouter} from "vue-router";
const router =useRouter();
const onClickLeft = () => router.back()
const onClickRight = () => router.push("/search");
const onChange = (index: any) => showToast(`标签 ${index}`);
</script>

<template>
  <van-nav-bar
      title="xiaxiang"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

<div id ="content">
  <router-view/>
</div>

  <van-tabbar route @change="onChange">
    <van-tabbar-item replace to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="friends-o" name="user" >个人</van-tabbar-item>

  </van-tabbar>
</template>

<style scoped>
/* 可以添加一些局部样式 */
</style>
