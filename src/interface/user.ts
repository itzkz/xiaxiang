import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
export const getCurrentUser = async () => {
    const res = await myAxios.get('/user/current');
    // @ts-ignore
    if (res.code === 0) {
        return res;
    }else {
        showToast("获取当前用户信息失败");
    }
}

