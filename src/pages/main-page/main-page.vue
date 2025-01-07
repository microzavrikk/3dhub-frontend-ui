<template>
    <div class="main-page">
      <div class="image-container">
        <div class="background-image"></div>
        <div class="gradient-background"></div>
      </div>
      <div class="dark-area">
        <div class="square-bump"></div>
      </div>
      <div class="buttons-container">
        <button class="login-btn" @click="showLogin">Log In</button>
        <button class="register-btn" @click="showSignUp">Register</button>
        <button class="upload-btn" @click="handleUpload">Upload</button>
      </div>
      <component :is="currentComponent" v-if="currentComponent" @close="closeComponent"></component>
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
  }
  
  .gradient-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #00c6ff 100%);
    opacity: 0.85;  /* Adjust this value to control the overlay strength */
    z-index: 2;
  }
  
  .dark-area {
    width: 100%;
    height: 30%;
    background-color: #1a1a1a;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .square-bump {
    width: 1000px;
    height: 260px;
    background-color: #1a1a1a;
    box-shadow: 0 0 0px rgba(0, 0, 0, 0.5);
    border-radius: 0px;
    position: absolute;
    top: -121px;
  }
  
  .buttons-container {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 8px;
    z-index: 3;  /* Ensure buttons are above the gradient */
  }
  
  button {
    padding: 8px 16px;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
  }
  
  .login-btn {
    color: white;
    background-color: transparent;
    border: none;
  }
  
  .login-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }
  
  .register-btn {
    color: white;
    background-color: #166D96;
  }
  
  .register-btn:hover {
    background-color: #135d80;
    transform: scale(1.05);
  }
  
  .upload-btn {
    color: white;
    background-color: #A95600;
  }
  
  .upload-btn:hover {
    background-color: #C86600;
    transform: scale(1.05);
  }
  </style>