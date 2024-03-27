import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
export const getCurrentUser = async () => {

    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');

    if (res.code === 0) {
        showToast("获取当前用户信息成功");
        return res;
    }else {
        showToast("获取当前用户信息失败");
    }

}

