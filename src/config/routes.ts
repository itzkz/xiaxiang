import index from "../pages/Index.vue";
import SearchUser from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLogin from "../pages/UserLogin.vue";
import UserDetailPage from "../pages/UserDetailPage.vue";
import UserPage from "../pages/UserPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserJoinTeamPage from "../pages/UserJoinTeamPage.vue";
import UserCreateTeamPage from "../pages/UserCreateTeamPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdate from "../pages/TeamUpdate.vue";
import UserRegister from "../pages/UserRegister.vue";
import FollowUserList from "../pages/FollowUserList.vue";
import FansUserList from "../pages/FansUserList.vue";
import SelectTagsPage from "../pages/SelectTagsPage.vue";

const routes = [
    {path: '/',  component: index},
    {path: '/team',title:"找队伍", component: TeamPage},
    {path: '/user',title:"个人信息", component: UserPage},
    {path: '/search',title:"找伙伴", component: SearchUser},
    {path: '/user/list',title:"用户列表", component: SearchResultPage},
    {path: '/user/edit',title:"编辑信息", component: UserEdit},
    {path: '/user/login',title:"登录", component: UserLogin},
    {path: '/user/detail',title:"个人详情", component: UserDetailPage},
    {path: '/team/join', title:"我加入的队伍",component: UserJoinTeamPage},
    {path: '/team/create',title:"我创建的队伍", component: UserCreateTeamPage},
    {path: '/team/add', title:"创建队伍",component: TeamAddPage},
    {path: '/team/update', title:"更新队伍",component: TeamUpdate},
    {path: '/user/register', title:"注册",component: UserRegister},
    {path: '/user/follow', title:"关注列表",component: FollowUserList},
    {path: '/user/fans', title:"粉丝列表",component: FansUserList},
    {path: '/user/tags', title:"选择标签",component: SelectTagsPage},

]
export default routes;