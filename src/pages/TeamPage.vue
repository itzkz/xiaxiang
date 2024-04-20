<template>
  <van-search show-action v-model="searchText" placeholder="搜素队伍" @search="onSearch">
    <template #action>
      <div @click="onClickButton">筛选</div>
      <van-popup v-model:show="showForm" position="bottom" style="height: 80%">
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
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              搜索
            </van-button>
          </div>
        </van-form>
      </van-popup>
    </template>
  </van-search>

  <van-floating-bubble id="searchTeam" icon="plus" axis="xy" magnetic="x"  @click="onClick" />

  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <TeamCardList :team-list="teamList"></TeamCardList>
  </van-pull-refresh>




</template>
<script setup lang="ts">

import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {useRouter} from "vue-router";
const router = useRouter();
const searchText = ref('');
const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
  }, 1000);
};

const showForm = ref(false);
const onClickButton = () => {
  showForm.value = true; // 点击按钮时显示表单
};
const onClick = () => {
  router.push('/team/add')
};

const onSubmit = async () => {
  // 处理表单提交逻辑
  const res = await myAxios.get("/team/list", {
    params: addTeamData.value,
  })
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast('加载队伍失败，请刷新重试');
  }
  showForm.value = false; // 提交表单后隐藏表单
};
const onSearch = (val) => {
  listTeam(val);
  searchText.value = ''
}
const teamList = ref([]);

const initFormData = {
  "name": "",
  "description": "",
  "expiretime": null,
  "maxnum": 3,
  "password": "",
  "status": 0,
}
const addTeamData = ref({...initFormData})
const showPicker = ref(false);

const onConfirm = ({selectedValues}) => {
  addTeamData.value.expiretime = selectedValues.join('/');
  showPicker.value = false;
};

const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      pageSize:8,
    }
  })
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast('加载队伍失败，请刷新重试');
  }
}


onMounted(() => {
  listTeam()
})


</script>
<style>
#searchTeam{
 top: -75px;
}

</style>