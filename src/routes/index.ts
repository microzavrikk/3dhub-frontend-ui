import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import uploadAsset from '../pages/upload-asset/upload-asset.vue'
import uploadInfoAsset from '../pages/upload-info-asset/upload-info-asset.vue'
import thirdDScene from '../components/3d-scene/3d-scene.vue'
import path from 'path'
import primeVueTest from '../prime-vue-test.vue'
import UserAuthService from '../service/auth/user.auth.service'
import signup from '../components/signup-window/signup.vue'
import login from '../components/login-window/login.vue'
import EmailVerificationModal from '../components/email-verification-modal/email-verification-modal.vue'
import MainPage from '../pages/main-page/main-page.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/main-page',
    name: 'MainPage',
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
    path: '/test',
    name: 'Test',
    component: primeVueTest
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
  return true
}

export default router