<template>
  <div class="main-container">
    <header class="header">
      <div class="logo">
        <h1>3DHUB</h1>
      </div>
      
      <div class="search-bar">
        <input type="text" placeholder="Search 3D models..." class="search-input">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      <div class="nav-buttons">
        <button class="nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Sign In
        </button>
        <button class="nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Sign Up
        </button>
        <button class="nav-btn">
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
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: linear-gradient(145deg, #f0f9ff, #e0f2fe);
  color: #0c4a6e;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(14, 165, 233, 0.2);
  box-shadow: 0 2px 10px rgba(14, 165, 233, 0.1);
}

.logo h1 {
  color: #0284c7;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.search-bar {
  position: relative;
  width: 40%;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 12px;
  color: #0c4a6e;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.2);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #0ea5e9;
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
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 12px;
  color: #0284c7;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: rgba(14, 165, 233, 0.2);
  transform: translateY(-2px);
}

.welcome-section {
  text-align: center;
  margin-top: 6rem;
  padding: 0 2rem;
}

.welcome-section h2 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #0284c7, #0ea5e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-section p {
  font-size: 1.5rem;
  color: #0c4a6e;
  max-width: 600px;
  margin: 0 auto;
}

.subtitle {
  font-size: 1.2rem !important;
  color: #0369a1 !important;
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
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.explore {
  background: #0ea5e9;
  color: white;
  border: none;
}

.create {
  background: white;
  color: #0ea5e9;
  border: 2px solid #0ea5e9;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(14, 165, 233, 0.3);
}

.arrow {
  transition: transform 0.3s;
}

.action-btn:hover .arrow {
  transform: translateX(5px);
}
</style>
