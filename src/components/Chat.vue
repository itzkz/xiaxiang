<template>
  <div class="chatPage" style="background-color: #828b2e; height: auto;">
    <van-notice-bar style="position: relative"
                    left-icon="volume-o"
                    scrollable
                    color="#1989fa" background="#ecf9ff"
                    text="感谢大家的光临，本项目仅供参考学习，切勿在此刷屏。为了维护和谐的网络环境，保护他人合法权益，发言时需要注意以下几点：不得发表违反国家法律法规的言论，包括但不限于煽动颠覆国家政权、宣扬恐怖主义、色情、暴力等内容。不得发布涉及他人隐私、名誉、财产等方面的信息。不得进行人身攻击、诽谤、侮辱、歧视等行为，尊重他人的权利和尊严。不得发布广告、垃圾信息等干扰他人正常使用网络的内容。不得散布虚假信息、恶意传播谣言等行为，避免误导他人。不得违反网络道德，包括但不限于恶意抄袭、剽窃、侵犯知识产权等行为。发言时需要注意措辞、语气，避免引起他人不良情绪或产生误解。"
    />
    <div class="content" style="background-color: aliceblue; width: auto;">
      <div ref="chatRoom">
        <div class="content" style="background-color: aliceblue; width: auto;" v-html="message"></div>
      </div>
    </div>
    <div id="chatBottom"
         style="position: fixed; bottom: 45px; left: 0; right: 0; z-index: 999 ">

      <van-cell-group inset>
        <van-field
            v-model="inputMessage"
            center
            clearable
            label="输入框"
            placeholder="请输入消息..."
            @keyup.enter="sendMessage"
        >
          <template #button>
            <van-icon color="green" @click="sendMessage" name="guide-o" size="40px"
                      style="padding-right: 10px; float: right; line-height: 50px; width: 48px;"
            />

          </template>
        </van-field>
      </van-cell-group>

    </div>
  </div>
</template>

<script setup>
import {nextTick, onMounted, ref} from "vue";
import {getCurrentUser} from "../interface/user.ts";
import {showFailToast} from "vant";
import {iKun} from "../constants/teamStatusEnum.ts";
const chatRoom = ref(null);
let socket = null;
const message = ref('');
const inputMessage = ref('');
const user = ref();
onMounted(async () => {
  const currentUser = ref();
  const res = await getCurrentUser();
  currentUser.value = res?.data
  user.value = res?.data
  const userId = currentUser.value.id;
  if (typeof WebSocket === 'undefined') {
    console.log('您的浏览器不支持WebSocket');
  } else {
    console.log('您的浏览器支持WebSocket');
    const socketUrl = `ws://localhost:8080/api/websocket/${userId}`;
    console.log(socketUrl);
    if (socket !== null) {
      socket.close();
      socket = null;
    }
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('WebSocket已打开');
    };

    socket.onmessage = (msg) => {
      console.log(msg.data);
      setMessage(msg.data);
    };

    socket.onclose = () => {
      console.log('WebSocket已关闭');

    };

    socket.onerror = () => {
      console.log('WebSocket发生了错误');
    };
  }

})


const sendMessage = () => {

  if (socket !== null) {
    if (!inputMessage.value.trim()){
      showFailToast("请输入内容")
    }else {
      socket.send(inputMessage.value);
      inputMessage.value = '';
    }
  } else {
    console.log('WebSocket未连接');
  }
};

const closeWebSocket = () => {
  if (socket !== null) {
    socket.close();
    socket = null;
    setMessage('WebSocket已关闭');
  }
};
let html = `
    <div class="message self">
    <div class="myInfo info">
      <img :alt=${user.username} class="avatar"  src=${user.avatarurl ?? iKun} width="50px" height="40px" >
    </div>

    </div>
`
const setMessage = (msg) => {
  message.value +=html+msg+'\n';
};

</script>

<style scoped>
.content {
  padding-top: 22px;
  padding-bottom: 57px;
  display: flex;
  flex-direction: column;
}

</style>
