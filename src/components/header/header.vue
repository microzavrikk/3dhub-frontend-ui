<template>
  <header class="header">
    <div class="logo-section">
      <div class="logo">
        <h1 class="logo-text">
          <router-link to="/" class="logo-link">
            <span class="logo-3d">3D</span>
            <span class="logo-hub">HUB</span>
          </router-link>
        </h1>
      </div>
      
      <div class="main-nav">
        <button class="nav-btn catalog-btn elegant dark">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"/>
          </svg>
          Catalog
        </button>
        
        <button class="nav-btn elegant dark">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          Community
        </button>

        <button class="nav-btn elegant dark">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"/>
          </svg>
          Blog
        </button>
      </div>
    </div>
    
    <SearchBar class="search-bar" />

    <div class="nav-buttons">
      <template v-if="!isAuthenticated">
        <button class="nav-btn auth-btn" @click="router.push('/login')">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Sign In
        </button>
        <button class="nav-btn primary auth-btn" @click="router.push('/signup')">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Sign Up
        </button>
      </template>
      
      <template v-if="isAuthenticated">
        <button class="nav-btn elegant upload-btn" @click="handleUpload">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
          </svg>
          Upload
        </button>

        <div class="profile-dropdown">
          <button class="nav-btn profile-btn enhanced" @click="showProfileMenu = !showProfileMenu">
            <div class="user-info">
              <div class="avatar-wrapper">
                <img v-if="user?.avatar" :src="user.avatar" class="user-avatar" alt="User avatar">
                <div v-else class="avatar-circle">
                  <svg class="user-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
              </div>
              <span class="username-text">{{ user?.username }}</span>
              <div class="status-indicator"></div>
              <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" :class="{ 'rotate': showProfileMenu }">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
          </button>
          
          <Transition name="menu-fade">
            <div v-if="showProfileMenu" class="profile-menu">
              <router-link 
                :to="{ name: 'Profile', params: { username: user?.username }}" 
                class="menu-item"
                v-if="user?.username"
              >
                <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Profile
              </router-link>
              <div class="menu-divider"></div>
              <button class="menu-item">
                <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                Help Center
              </button>
              <div class="menu-divider"></div>
              <button class="menu-item logout" @click="handleSignOut">
                <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Log Out
              </button>
            </div>
          </Transition>
        </div>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from '../search-bar/search-bar.vue';
import { UserAuthService } from '../../service/auth/user.auth.service';

const router = useRouter();
const showProfileMenu = ref(false);

const isAuthenticated = computed(() => UserAuthService.isAuthenticated());
const user = computed(() => {
  const userData = UserAuthService.getUser();
  return userData ? JSON.parse(userData) : null;
});

const handleSignOut = () => {
  UserAuthService.removeAuthToken();
  UserAuthService.setUser(null);
};

const handleUpload = () => {
  router.push('/upload-asset');
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: #0a0a0a;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.header {
  background: rgba(40, 40, 40, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.logo-3d {
  color: #4CAF50;
  font-weight: 800;
  letter-spacing: 0.5px;
  font-size: 32px;
  line-height: 1;
}

.logo-hub {
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 0.5px;
  font-size: 32px;
  line-height: 1;
}

.catalog-btn {
  background: linear-gradient(135deg, #4CAF50, #388E3C);
  border: none;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.catalog-btn:hover {
  background: linear-gradient(135deg, #42A5F5, #2196F3);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
}

.logo-text::before {
  content: none;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes glow {
  from {
    text-shadow: none;
  }
  to {
    text-shadow: none;
  }
}

.search-bar {
  width: 45%;
  padding-right: 3rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  background: rgba(30, 30, 30, 0.95);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
}

.nav-btn:hover {
  background: rgba(45, 45, 45, 0.95);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.nav-btn:active {
  transform: translateY(-1px);
}

.nav-btn.primary {
  background: linear-gradient(135deg, #00c853, #00b248);
  color: #fff;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3);
  position: relative;
  overflow: hidden;
}

.nav-btn.primary:hover {
  background: linear-gradient(135deg, #00e676, #00c853);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 200, 83, 0.4);
}

.nav-btn.primary:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.nav-btn.primary:hover:before {
  left: 100%;
}

.btn-icon {
  opacity: 0.9;
}

.profile-dropdown {
  position: relative;
}

.profile-btn {
  min-width: 160px;
  background: rgba(40, 40, 40, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.user-icon {
  color: #4CAF50;
}

.username-text {
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

.upload-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
}

.profile-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  min-width: 220px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transform-origin: top;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.75rem 1.25rem;
  color: #fff;
  text-decoration: none;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.menu-item:hover {
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.menu-item.logout {
  color: #ff4444;
}

.menu-item.logout:hover {
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
}

.menu-icon {
  opacity: 0.9;
}

.menu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
}

.content {
  padding: 80px 5%;
  background: #111111;
  margin-bottom: 60px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  position: relative;
}

.content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://cdna.artstation.com/p/assets/images/images/075/847/876/large/roksolana-khrouchtch-gap-f-khrouchtch-roksolana-01.jpg?1715857261');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 0;
}

.hero {
  text-align: left;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.hero-content {
  width: 50%;
  padding-left: 5%;
}

.hero-text {
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 56px;
  color: #fff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
}

.subtitle {
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.description {
  color: #999;
  font-size: 18px;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat {
  text-align: left;
}

.stat .number {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #4CAF50;
}

.stat .label {
  color: #999;
  font-size: 14px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.btn.primary {
  background: #4CAF50;
  color: #fff;
  border: none;
}

.btn.primary:hover {
  transform: translateY(-2px);
  background: #66BB6A;
}

.btn.secondary {
  background: transparent;
  color: #4CAF50;
  border: 1px solid #4CAF50;
}

.btn.secondary:hover {
  background: #4CAF50;
  color: #fff;
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 80px;
  position: relative;
  z-index: 1;
}

.feature {
  background: #1a1a1a;
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  transition: transform 0.3s;
  border: 1px solid #333;
}

.feature:hover {
  transform: translateY(-10px);
}

.feature .icon {
  color: #4CAF50;
  margin-bottom: 20px;
}

.feature h3 {
  color: #fff;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

.feature p {
  color: #999;
  line-height: 1.6;
}
</style>