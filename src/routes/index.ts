import { createRouter, createWebHistory } from 'vue-router'
import uploadAsset from '../pages/upload-asset/upload-asset.vue'
import uploadInfoAsset from '../pages/upload-info-asset/upload-info-asset.vue'
import thirdDScene from '../components/3d-scene/3d-scene.vue'
import { UserAuthService } from '../service/auth/user.auth.service'
import signup from '../components/signup-window/signup.vue'
import login from '../components/login-window/login.vue'
import EmailVerificationModal from '../components/email-verification-modal/email-verification-modal.vue'
import MainPage from '../pages/main-page/main-page.vue'
import Home from '../pages/home-page/Home.vue'
import Profile from '../pages/profile-page/profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage
  },
  {
    path: '/email-verification',
    name: 'EmailVerification',
    component: EmailVerificationModal
  },
  {
    path: '/signup',
    name: 'Signup',
    component: signup
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/upload-asset',
    name: 'UploadAsset',
    component: uploadAsset,
    meta: { requiresAuth: true },
  },
  {
    path: '/upload-info-asset',
    name: 'UploadInfoAsset',
    component: uploadInfoAsset,
    meta: { requiresAuth: true }
  },
  {
    path: '/3d-scene',
    name: '3DScene',
    component: thirdDScene
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !(await isAuthenticated())) {
    next({ name: 'Signup' });
  } else {
    next();
  }
});

async function isAuthenticated(): Promise<boolean> {
  console.log(UserAuthService.isAuthenticated());
  return UserAuthService.isAuthenticated();
}

export default router