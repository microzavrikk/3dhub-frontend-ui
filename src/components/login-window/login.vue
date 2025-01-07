<template>
  <div class="login-modal">
    <div class="login-content">
      <div class="login-header">
        <h2>Log in to 3dHub</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
        <hr />
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group remember-me">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Remember me</label>
        </div>
        <button type="submit" class="login-btn">LOG IN</button>
      </form>
      <p class="small-text">
        Don’t have an account? <a href="#" class="signup-link">Sign up here</a>.
      </p>
      <p class="small-text">
        Forgot your password? <a href="#" class="reset-link">Reset it here</a>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useLoginMutation } from '../../types';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const emit = defineEmits(['close']);

const { mutate: login, onDone, onError } = useLoginMutation();

const handleLogin = async () => {
  try {
    const response = await login({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    });
    console.log(response);
    console.log('Login successful:', response);
    closeModal();
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped src="./login.css"></style>