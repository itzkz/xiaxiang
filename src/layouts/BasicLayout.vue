<script setup lang="ts">
import { useRouter} from "vue-router";
import routes from "../config/routes.ts";
import {ref} from "vue";


const router =useRouter();
const onClickLeft = () => {
  // 获取当前路由信息
  const currentRoute = router.currentRoute.value;
  // 检查当前页面是否是主页，你需要根据你的路由配置来确定主页的路径
  const isHomePage = currentRoute.path === '/';

  // 如果不是主页，则执行返回操作
  if (!isHomePage) {
    router.back();
  }

}
const onClickRight = () => router.push("/search");
// const onChange = (index: any) => showToast(`标签 ${index}`);

const DEFALUT_TITLE= '遐想匹配';

const title = ref(DEFALUT_TITLE);


router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFALUT_TITLE;
})

</script>

<template>

  <van-nav-bar
      :title="title"
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
  <van-tabbar route >
    <van-tabbar-item replace to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="friends-o" name="user" >个人</van-tabbar-item>

  </van-tabbar>

</template>

<style scoped>
/* 可以添加一些局部样式 */
#content{
  padding-bottom: 50px;
}
</style>
