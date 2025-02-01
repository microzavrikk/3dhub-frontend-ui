<template>
  <div class="main-container">
    <header class="header">
      <div class="logo">
        <h1 class="logo-text">3D HUB</h1>
      </div>
      
      <SearchBar class="search-bar" />

      <div class="nav-buttons">
        <template v-if="!isAuthenticated">
          <button class="nav-btn" @click="showLoginModal = true">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Sign In
          </button>
          <button class="nav-btn primary" @click="showSignupModal = true">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Sign Up
          </button>
        </template>
        
        <template v-if="isAuthenticated">
          <div class="profile-dropdown">
            <button class="nav-btn profile-btn" @click="showProfileMenu = !showProfileMenu">
              <div class="user-info">
                <svg class="user-icon" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span class="username-text">{{ user?.username }}</span>
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

        <button class="nav-btn primary upload-btn" @click="handleUpload">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
          </svg>
          Upload
        </button>
      </div>
    </header>

    <main class="content">
      <div class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1>Welcome to 3DHUB</h1>
            <p class="subtitle">Your Gateway to 3D Content</p>
            <p class="description">Create. Share. Discover.</p>
          </div>
          
          <div class="hero-stats">
            <div class="stat">
              <span class="number">10K+</span>
              <span class="label">Models</span>
            </div>
            <div class="stat">
              <span class="number">5K+</span>
              <span class="label">Artists</span>
            </div>
            <div class="stat">
              <span class="number">100K+</span>
              <span class="label">Downloads</span>
            </div>
          </div>

          <div class="hero-actions">
            <router-link to="/catalog" class="btn primary">Explore</router-link>
            <button class="btn secondary" @click="handleUpload">Create</button>
          </div>
        </div>
      </div>

      <div class="features">
        <div class="feature">
          <div class="icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15z"/>
            </svg>
          </div>
          <h3>High Quality Models</h3>
          <p>Access thousands of professionally created 3D models</p>
        </div>
        
        <div class="feature">
          <div class="icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h3>Global Community</h3>
          <p>Join creators from around the world</p>
        </div>

        <div class="feature">
          <div class="icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 2v11h3v9l7-12h-4l4-8z"/>
            </svg>
          </div>
          <h3>Fast Downloads</h3>
          <p>Instant access to all your favorite models</p>
        </div>
      </div>
    </main>

    <login-modal v-if="showLoginModal" @close="showLoginModal = false" />
    <signup-modal v-if="showSignupModal" @close="showSignupModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from '../../components/login-window/login.vue';
import SignupModal from '../../components/signup-window/signup.vue';
import SearchBar from '../../components/search-bar/search-bar.vue';
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

.logo {
  height: 60px;
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 32px;
  color: #fff;
  text-shadow: 
    0 0 10px rgba(0, 255, 128, 0.8),
    0 0 20px rgba(0, 255, 128, 0.6),
    0 0 30px rgba(0, 255, 128, 0.4);
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  background: linear-gradient(135deg, 
    #fff 0%, 
    #00ff80 25%,
    #fff 50%,
    #00ff80 75%,
    #fff 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  padding: 0 10px;
  transform: skew(-5deg);
  animation: shine 3s linear infinite;
}

.logo-text::before {
  content: '3D HUB';
  position: absolute;
  left: 10px;
  top: 2px;
  z-index: -1;
  background: linear-gradient(135deg, #00ff80, #00b359);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.7;
  animation: glow 2s ease-in-out infinite alternate;
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
    text-shadow: 
      0 0 10px rgba(0, 255, 128, 0.8),
      0 0 20px rgba(0, 255, 128, 0.6),
      0 0 30px rgba(0, 255, 128, 0.4);
  }
  to {
    text-shadow:
      0 0 20px rgba(0, 255, 128, 0.8),
      0 0 30px rgba(0, 255, 128, 0.6),
      0 0 40px rgba(0, 255, 128, 0.4);
  }
}

.search-bar {
  width: 40%;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-btn {
  padding: 0.75rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  background: rgba(40, 40, 40, 0.8);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn:hover {
  background: rgba(60, 60, 60, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.nav-btn.primary {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: #fff;
  border: none;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.nav-btn.primary:hover {
  background: linear-gradient(135deg, #66BB6A, #4CAF50);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
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
