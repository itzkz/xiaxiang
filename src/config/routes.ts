import Team from "../pages/TeamPage.vue";
import index from "../pages/Index.vue";
import User from "../pages/UserPage.vue";
import SearchUser from "../pages/SearchPage.vue";


import UserEdit from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLogin from "../pages/UserLogin.vue";

const routes = [
    {path: '/', component: index},
    {path: '/team', component: Team},
    {path: '/user', component: User},
    {path: '/search', component: SearchUser},
    {path: '/user/list', component: SearchResultPage},
    {path: '/user/edit', component: UserEdit},
    {path: '/user/login', component: UserLogin},

]
export default routes;