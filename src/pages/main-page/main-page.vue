<template>
  <div class="main-container">
    <header class="header">
      <div class="logo">
        <img src="./logo.png" alt="3DHUB Logo" class="logo-image">
      </div>
      
      <div class="search-bar">
        <input type="text" placeholder="Search 3D models..." class="search-input">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      <div class="nav-buttons">
        <template v-if="!isAuthenticated">
          <button class="nav-btn" @click="showLoginModal = true">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Sign In
          </button>
          <button class="nav-btn" @click="showSignupModal = true">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Sign Up
          </button>
        </template>
        
        <template v-if="isAuthenticated">
          <div class="profile-dropdown">
            <button class="nav-btn profile-btn" @click="showProfileMenu = !showProfileMenu">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              {{ user?.username }}
              <svg width="12" height="12" viewBox="0 0 24 24" :class="{ 'rotate': showProfileMenu }">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            
            <div v-if="showProfileMenu" class="profile-menu">
              <router-link 
                :to="{ name: 'Profile', params: { username: user?.username }}" 
                class="menu-item"
                v-if="user?.username"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                {{ user?.username }}
              </router-link>
              <div class="menu-divider"></div>
              <button class="menu-item">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                Help Center
              </button>
              <div class="menu-divider"></div>
              <button class="menu-item" @click="handleSignOut">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Log Out
              </button>
            </div>
          </div>
        </template>

        <button class="nav-btn" @click="handleUpload">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
          </svg>
          Upload
        </button>
      </div>
    </header>

    <main class="welcome-section">
      <h2>Welcome to 3DHUB</h2>
      <p>Your Gateway to Amazing 3D Content</p>
      <p class="subtitle">Create, Share, and Discover Incredible 3D Models</p>
      <div class="welcome-buttons">
        <button class="action-btn explore">
          Explore Models
          <span class="arrow">→</span>
        </button>
        <button class="action-btn create">
          Start Creating
          <span class="arrow">→</span>
        </button>
      </div>
    </main>

    <login-modal
      v-if="showLoginModal"
      @close="showLoginModal = false"
    />

    <signup-modal
      v-if="showSignupModal"
      @close="showSignupModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from '../../components/login-window/login.vue';
import SignupModal from '../../components/signup-window/signup.vue';
import { UserAuthService } from '../../service/auth/user.auth.service';

const router = useRouter();
const showLoginModal = ref(false);
const showSignupModal = ref(false);
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.main-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(36, 36, 48, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 70px;
  width: 140px;
  object-fit: contain;
  filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
  margin: -10px 0; /* Negative margin to prevent header expansion */
}

.search-bar {
  position: relative;
  width: 40%;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  background: rgba(42, 42, 58, 0.8);
  border: 1px solid #3b82f6;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s;
  backdrop-filter: blur(5px);
}

.search-input:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #3b82f6;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(42, 42, 58, 0.8);
  border: 1px solid #3b82f6;
  border-radius: 8px;
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(5px);
}

.nav-btn:hover {
  background: #3b82f6;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.welcome-section {
  text-align: center;
  margin-top: 6rem;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.welcome-section h2 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #3b82f6, #60a5fa, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
}

.welcome-section p {
  font-size: 1.5rem;
  color: #e5e7eb;
  max-width: 600px;
  margin: 0 auto;
}

.subtitle {
  font-size: 1.2rem !important;
  color: #9ca3af !important;
  margin-top: 1rem !important;
  margin-bottom: 2rem !important;
}

.welcome-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2.5rem;
}

.action-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.explore {
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  color: white;
  border: none;
}

.create {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  backdrop-filter: blur(5px);
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 25px rgba(59, 130, 246, 0.4);
}

.arrow {
  transition: transform 0.3s;
}

.action-btn:hover .arrow {
  transform: translateX(5px);
}

.profile-dropdown {
  position: relative;
}

.profile-btn svg:last-child {
  transition: transform 0.3s;
}

.profile-btn svg.rotate {
  transform: rotate(180deg);
}

.profile-menu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: rgba(36, 36, 48, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
  border: 1px solid #3b82f6;
  backdrop-filter: blur(10px);
}

.menu-divider {
  height: 1px;
  background: rgba(59, 130, 246, 0.2);
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 15px;
  border: none;
  background: none;
  color: #e5e7eb;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.menu-item:hover {
  background: rgba(42, 42, 58, 0.8);
  color: #3b82f6;
}
</style>
