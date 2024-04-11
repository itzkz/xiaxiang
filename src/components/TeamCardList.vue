<script setup lang="ts">
import {TeamType} from "../models/team";
import iKun from "../assets/iKun.png";
import {teamStatusEnum} from "../constants/teamStatusEnum.ts";
import {getCurrentUser} from "../interface/user.ts";
import {onMounted} from "vue";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  loading: boolean;
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  loading: true,
  // @ts-ignore
  teamList: [] as TeamType[],
});
// 格式化时间函数
const formatTime = (time: Date): string => {
  const date = new Date(time);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

// 格式化 teamList 中的时间
props.teamList.map(team => ({
  ...team,
  expiretime: team.expiretime ? formatTime(team.expiretime) : '',
  createtime: formatTime(team.createtime)
}));
const currentUser = ref();
onMounted(async () => {
  const res = await getCurrentUser();
  currentUser.value = res?.data
})

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
const router = useRouter();
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamid: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    showToast('加入成功');
    doJoinCancel();
  } else {
    showToast(`操作失败${res.description ? '，' + res.description : ''}`);
  }
}


/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}


/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamid: id
  });
  if (res?.code === 0) {
    showToast('操作成功');
  } else {
    showToast(`操作失败${res.description ? '，' + res.description : ''}`);
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    teamid: id
  });
  if (res?.code === 0) {
    showToast('操作成功');
  } else {
    showToast(`操作失败${res.description ? '，' + res.description : ''}`);
  }
}


</script>

<template>
  <div id="teamCardList"

  >

    <van-card loading="props.loading"
              v-for="team in props.teamList"
              :desc="team.name"
              :title="team.description"
              :thumb="iKun"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-top: 8px; margin-right: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasjoinnum}/${team.maxnum}` }}
        </div>
        <div v-if="team.expiretime">
          {{ '过期时间: ' + formatTime(team.expiretime) }}
        </div>
        <div>
          {{ '创建时间: ' + formatTime(team.createtime) }}
        </div>

      </template>
      <template #footer>
        <van-button size="small" type="primary" v-if="team.userid !== currentUser?.id" plain
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.userid === currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button v-if="team.userid !== currentUser?.id " size="small" plain
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userid === currentUser?.id" size="small" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
                @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>


</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>