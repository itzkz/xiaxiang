<template>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">保存</van-button>
    <van-cell title="" @click="goToHomePage" value="暂不选择"></van-cell>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
const router = useRouter()
const goToHomePage = () => {
  router.replace("/")
}
/**
 * 搜索过滤
 */
// 已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

// 移除标签
const doClose = (tag: string) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/**
 * 执行搜索
 */
const doSearchResult =async () => {
  if (activeIds.value.length <= 10) {
   const res =await myAxios.post("/user/save/tags", {
      tagNameList: activeIds.value
    })
    if (res.code===0){
      showToast("保存标签成功")
     await router.replace("/");
    }else {
      showToast("保存标签失败")
    }
  } else {
    // 提示用户已达到最大选择数量
    showToast("最多只能选择10个标签");
  }
};



const responseData = ref([]);
let tagList = ref([]);

// 转换函数
function convertDataToOriginTagList(data: Record<string, string[]>): {
  text: string,
  children: { text: string, id: string }[]
}[] {
  const originTagList = [];
  for (const category in data) {
    const categoryObj = {
      text: category,
      children: data[category].map(tag => ({text: tag, id: tag}))
    };
    originTagList.push(categoryObj);
  }

  return originTagList;
}

onMounted(async () => {
  try {
    const res = await myAxios.get("tags/list");
    if (res.code === 0) {
      responseData.value = res.data;
      tagList.value = convertDataToOriginTagList(res.data);
    } else {
      showToast("获取标签列表失败");
    }
  } catch (error) {
    console.error("网络请求失败:", error);
    showToast("网络请求失败，请稍后重试");
  }
});
</script>

<style scoped>

</style>
