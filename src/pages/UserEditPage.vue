<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <div v-if="editUser.editKey==='tags'">
        <van-cell title="我的标签" is-link :value="editUser.currentValue" @click.native.prevent/>
        <van-button round block type="primary" native-type="submit" to="/user/tags">
          去修改
        </van-button>
      </div>
      <van-field v-if="editUser.editKey!=='tags'" v-model="editUser.currentValue" :name="editUser.editKey"
                 :label="editUser.editName" :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" v-if="editUser.editKey!=='tags'">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../interface/user";
import {showToast} from "vant";

const route = useRoute();
const router = useRouter()
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName
})
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    showToast('用户未登录');
    return;
  }
  console.log(currentUser, '当前用户')
  const res = await myAxios.post('/user/update', {
    'id': currentUser.data.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  console.log(res, '更新请求');
  if (res.code === 0 && res.data > 0) {
    showToast('修改成功');
    router.back();
  } else {
    showToast('修改错误');
  }
};
</script>
<style scoped>
</style>