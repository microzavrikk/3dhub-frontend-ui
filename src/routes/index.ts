import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { UserAuthService } from '../service/auth/user.auth.service'

const routes: RouteRecordRaw[] = [
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(async (to, _, next) => {
    if(to.name !== 'login-base-page' && !(await isAuthenticated())) next({ name: 'login-base-page'})
    else next()
})

async function isAuthenticated() {
    return UserAuthService.hasAuthToken()
}
  
export default router