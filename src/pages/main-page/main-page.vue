<template>
  <div class="main-page">
    <div class="image-container">
      <div class="background-image"></div>
      <div class="gradient-background"></div>
    </div>
    <div class="search-container">
      <div class="search-wrapper">
        <i class="fa-brands fa-searchengin"></i>
        <input type="text" placeholder="Search..." class="search-input" />
      </div>
    </div>
    <div class="dark-area">
      <div class="square-bump"></div>
    </div>
    <div class="buttons-container">
      <button class="login-btn" @click="showLogin">Log In</button>
      <button class="register-btn" @click="showSignUp">Register</button>
      <button class="upload-btn" @click="handleUpload">Upload</button>
    </div>
    <div class="modal-wrapper" v-if="currentComponent">
      <component 
        :is="currentComponent" 
        @close="closeComponent"
        class="modal-component"
      ></component>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Login from '../../components/login-window/login.vue';
import SignUp from '../../components/signup-window/signup.vue';

export default {
  name: 'MainPage',
  setup() {
    const currentComponent = ref(null);

    const showLogin = () => {
      currentComponent.value = Login;
    };

    const showSignUp = () => {
      currentComponent.value = SignUp;
    };

    const closeComponent = () => {
      currentComponent.value = null;
    };

    const handleUpload = () => {
      // Add upload logic here
    };

    return {
      currentComponent,
      showLogin,
      showSignUp,
      closeComponent,
      handleUpload
    };
  }
}
</script>

<style scoped>
.main-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
}

.image-container {
  position: relative;
  width: 100%;
  height: 70%;
  overflow: hidden;
  z-index: 1;
}

.background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('@/assets/main-page/anime.jpg') no-repeat center center;
  background-size: cover;
  z-index: 1;
}

.gradient-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #00c6ff 100%);
  opacity: 0.85;
  z-index: 2;
}

.search-container {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  z-index: 10;
  display: flex;
  justify-content: center;
  pointer-events: auto;
}

.search-wrapper {
  position: relative;
  width: 1000px;
  display: flex;
  align-items: center;
}

.fa-searchengin {
  position: absolute;
  left: 16px;
  color: #6B7280;
  pointer-events: none;
  z-index: 11;
}

.search-input {
  width: 100%;
  padding: 8px 16px 8px 48px;
  background-color: rgba(17, 24, 39, 0.7);
  border: 1px solid rgba(75, 85, 99, 0.4);
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  z-index: 10;
}

.search-input::placeholder {
  color: #6B7280;
}

.search-input:focus {
  outline: none;
  background-color: rgba(17, 24, 39, 0.8);
  border-color: rgba(75, 85, 99, 0.6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.dark-area {
  width: 100%;
  height: 30%;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;
}

.square-bump {
  width: 150px;
  height: 150px;
  background-color: #333;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  position: absolute;
  top: -75px;
  z-index: 4;
}

.buttons-container {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 10;
  pointer-events: auto;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;
  z-index: 10;
}

.login-btn {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.register-btn {
  background-color: #269dcc;
  color: white;
}

.upload-btn {
  background-color: #28a7d8;
  color: white;
  display: flex;
  align-items: center;
}

.upload-icon {
  margin-right: 5px;
}

button:hover {
  transform: scale(1.05);
}

/* Modal styles */
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-component {
  position: relative;
  z-index: 1001;
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

/* Ensure modals are visible and styled properly */
:deep(.modal-component) {
  background-color: #1a1a1a;
  color: white;
  border-radius: 10px;
  padding: 20px;
}
</style>