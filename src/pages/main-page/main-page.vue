<template>
  <div class="main-container">
    <Header />
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
import { ref } from 'vue';
import Header from '../../components/header/header.vue';
import LoginModal from '../../components/login-window/login.vue';
import SignupModal from '../../components/signup-window/signup.vue';

const showLoginModal = ref(false);
const showSignupModal = ref(false);
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: #0a0a0a;
  font-family: 'Poppins', sans-serif;
  color: #fff;
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
