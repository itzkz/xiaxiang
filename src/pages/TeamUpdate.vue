<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="addTeamData.expiretime"

            is-link
            readonly
            name="datePicker"
            label="过期时间"
            placeholder="请选择过期时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker @confirm="onConfirm" @cancel="showPicker = false"/>
        </van-popup>
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxnum" max="10" min="3"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="js">
import {ref, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
const router = useRouter();
const route = useRoute();
const id = route.query.id;
// 需要用户填写的表单数据
const addTeamData = ref({
  status: 0, // 默认为公开状态，对应枚举值 0
});

// 展示日期选择器
const showPicker = ref(false);

// 提交表单
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
    id: id
  };
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showToast("修改成功");
    await router.push({
      path: "/team",
      replace: true
    });
  } else {
    showToast("修改失败");
  }
};

// 日期选择器确认事件处理函数
const onConfirm = ({selectedValues}) => {
  addTeamData.value.expiretime = selectedValues.join("/");
  showPicker.value = false;
};

onMounted(async () => {
  if (id <= 0) {
    showToast("加载队伍失败");
    return;
  }
  const res = await myAxios.get("/team/list", {
    params: {
      id
    }
  });
  if (res?.code === 0) {
    // 将从后端返回的数据填充到表单数据对象中
    addTeamData.value = res.data[0];  // 使用 _rawValue 数组的第一个元素
  } else {
    showToast("加载队伍失败");
  }
});

</script>
<style scoped>
</style>
