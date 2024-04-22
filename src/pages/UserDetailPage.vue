<template>
  <div v-if="user">
    <div style="padding-top: 40px"></div>

    <div class="center" style="margin-bottom: 20px ; margin-left: 120px"  >
      <van-uploader :after-read="afterRead"
                    :max-count="1"
                    :max-size="5000 * 1024"
                    @oversize="onOversize">
        <div >
            <img  class="img" :src="user.avatarurl ? user.avatarurl :defaultPicture " alt=""  >
        </div>
        <div class="updateAvatarUrl" v-if="updateAvatarUrl">
          <van-loading color="#0094ff" size="10">头像更新中...</van-loading>
        </div>
      </van-uploader>
    </div>

    <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username',
user.username, '昵称')"/>
    <van-cell title="账号" :value="user.useraccount"/>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender',
user.gender, '性别')"/>
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone', user.phone,
'电话')"/>
    <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email', user.email,
'邮箱')"/>
    <van-cell title="我的标签" is-link :value="user.tags" @click="toEdit('tags', user.tags,
'标签')"/>

    <van-cell title="注册时间" :value="user.createtime"/>

  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
const defaultPicture = ref(iKun)

import {getCurrentUser} from "../interface/user.ts";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import {iKun} from "../constants/teamStatusEnum.ts";

const updateAvatarUrl = ref(false);
let user = ref();
onMounted(async () => {
  await refreshUser();
});

const refreshUser = async () => {
  const res = await getCurrentUser();
  user.value = res?.data;
};

const afterRead = async (file: any) => {
  updateAvatarUrl.value = true;
  if (updateAvatarUrl.value) {
    const fileFile = file.file;
    const res = await myAxios.post("/file/upload/image", {
      file: fileFile,
    }, {
      headers: {'Content-Type': 'multipart/form-data'},
    });

    const response = await myAxios.post("/user/update", {
      id: user.value.id,
      avatarurl: res.data
    });

    if (response.code === 0) {
      // 更新成功后直接更新用户对象的头像URL
      user.value.avatarurl = res.data;
      showSuccessToast("更新成功");
      updateAvatarUrl.value = false;
    }
  }
};

const onOversize = () => {
  showFailToast("头像上传大小不能超过500kb")
}

//
// const user = ref({
//   id: 1,
//   username: 'zkz',
//   useraccount: 'itzkz',
//   gender: '男',
//   phone: '12345',
//   email: '11111@qq.com',
//   avatarurl: "https://img.zcool.cn/community/0118e45bf7bda7a80121ab5dd5b8d8.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp",
//   gmtCreate: new Date().toDateString()
// })
const router = useRouter();
const toEdit = (editKey: string, currentValue: string, editName: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      currentValue,
      editName
    }
  })
}
</script>
<style scoped>
.img {
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.5);
  border-radius: 20%;
  height: 135px;
  width: 135px;
}
</style>