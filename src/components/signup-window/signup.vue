<template>
  <div class="signup-modal">
    <div class="signup-content">
      <div class="signup-header">
        <h2>Signup</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
        <hr />
      </div>
      <form @submit.prevent="handleRegister">
        <div class="form-group username-group">
          <label for="username">Username</label>
          <div class="username-input-wrapper">
            <input 
              type="text" 
              id="username" 
              v-model="registerForm.username" 
              required 
              placeholder="your-name"
              class="username-input"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <input 
              type="email" 
              id="email" 
              v-model="registerForm.email" 
              placeholder="you@email.com" 
              required 
              class="input-field"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="password">Create password</label>
          <div class="input-wrapper">
            <input 
              type="password" 
              id="password" 
              v-model="registerForm.password" 
              required 
              class="input-field"
            />
          </div>
        </div>
        <div class="form-group policy">
          <input 
            type="checkbox" 
            id="policy" 
            v-model="policyAccepted" 
            required 
          />
          <label for="policy">I agree to the policy</label>
        </div>
        <p class="small-text">
          By creating an account, your username becomes public and can be read by anyone who visits the website. 
          Do not include sensitive data like IDs, credentials, or non-public information. 
          Learn how to edit your username. Learn how to delete your account.
        </p>
        <button type="submit" class="create-account-btn">CREATE ACCOUNT</button>
        <div class="additional-links">
          <p>
            Already have an account? 
            <a href="/login" class="link">Log in here</a>
          </p>
          <p>
            <a href="/privacy-policy" class="link">Privacy Policy</a> • 
            <a href="/help" class="link">Help</a> • 
            <a href="/terms-and-conditions" class="link">Terms & Conditions</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useRegisterMutation } from '../../types';
import { RegisterForm } from '../common.types'

const registerForm = ref<RegisterForm>({
  username: '',
  password: '',
  email: ''
});

const isFormValid = (): boolean => {
  return !!registerForm.value.username && !!registerForm.value.password && !!registerForm.value.email;
}

const username = ref('');
const email = ref('');
const password = ref('');
const policyAccepted = ref(false);

const emit = defineEmits(['close']);

const { mutate: register, onError } = useRegisterMutation();

const handleRegister = async () => {
  if(!isFormValid()) {
    console.error('Form is not valid');
    return;
  }
  const response = await register({
    data: {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password
    }
  })
  resetForm();
}

const resetForm = () => {
  registerForm.value.username = ''
  registerForm.value.password = ''
  registerForm.value.email = ''
}

const closeModal = () => {
  emit('close');
};
</script>

<style scoped src="./signup.css"></style>