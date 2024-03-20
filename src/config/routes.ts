import Team from "../pages/TeamPage.vue";
import index from "../pages/Index.vue";
import User from "../pages/UserPage.vue";
import SearchUser from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";

const routes = [
    {path: '/', component: index},
    {path: '/team', component: Team},
    {path: '/user', component: User},

    {path: '/search', component: SearchUser},

    {path: '/user/edit', component: UserEdit},
]
export default routes;