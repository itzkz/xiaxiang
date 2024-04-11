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

const routes = [
    {path: '/', component: index},
    {path: '/team', component: TeamPage},
    {path: '/user', component: UserPage},
    {path: '/search', component: SearchUser},
    {path: '/user/list', component: SearchResultPage},
    {path: '/user/edit', component: UserEdit},
    {path: '/user/login', component: UserLogin},
    {path: '/user/detail', component: UserDetailPage},
    {path: '/team/join', component: UserJoinTeamPage},
    {path: '/team/create', component: UserCreateTeamPage},
    {path: '/team/add', component: TeamAddPage},

]
export default routes;