<template>
  <div class="signup-modal" @click.self="closeModal">
    <div class="signup-content">
      <div class="signup-header">
        <h2>Signup</h2>
        <div class="header-underline"></div>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <form @submit.prevent="handleRegister" class="signup-form">
        <div class="form-group">
          <input 
            type="text" 
            id="username" 
            v-model="registerForm.username" 
            required 
            placeholder=" "
            autocomplete="off"
          />
          <label for="username">Username</label>
        </div>

        <div class="form-group">
          <input 
            type="email" 
            id="email" 
            v-model="registerForm.email" 
            required 
            placeholder=" "
            autocomplete="off"
          />
          <label for="email">Email</label>
        </div>

        <div class="form-group">
          <input 
            type="password" 
            id="password" 
            v-model="registerForm.password" 
            required 
            placeholder=" "
            autocomplete="new-password"
          />
          <label for="password">Create password</label>
        </div>

        <div class="checkbox-container">
          <label class="checkbox-wrapper">
            <input 
              type="checkbox" 
              id="policy" 
              v-model="policyAccepted" 
              required 
            />
            <span class="checkmark"></span>
            I agree to the policy
          </label>
        </div>

        <p class="policy-text">
          By creating an account, your username becomes public and can be read by anyone who visits the website. 
          Do not include sensitive data like IDs, credentials, or non-public information.
        </p>

        <button type="submit" class="signup-btn">
          CREATE ACCOUNT
        </button>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <div class="social-login">
        <button class="social-btn google">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </div>

      <div class="links">
        <a href="#" class="login-link">Already have an account? Log in</a>
        <div class="secondary-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <span class="separator">•</span>
          <a href="/help">Help</a>
          <span class="separator">•</span>
          <a href="/terms-and-conditions">Terms & Conditions</a>
        </div>
      </div>
    </div>
  </div>

  <EmailVerificationModal
    v-if="showVerificationModal"
    :user-email="registerForm.email"
    @close="handleVerificationClose"
    @resend="handleResendVerification"
    @change-email="handleChangeEmail"
  />
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { RegisterForm } from '../common.types'
import EmailVerificationModal from '../email-verification-modal/email-verification-modal.vue';
import { useRegisterMutation } from '../../types';

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

const { mutate: register } = useRegisterMutation();

const showVerificationModal = ref(false);

const handleRegister = async () => {
  if(!isFormValid()) {
    console.error('Form is not valid');
    return;
  }
  
  try {
    const response = await register({
      data: {
        username: registerForm.value.username,
        email: registerForm.value.email,
        password: registerForm.value.password
      }
    }) ?? {};
    
    if (response?.data?.Auth?.register?.accessToken) {
      showVerificationModal.value = true;
    }
  } catch (error: any) {
    console.error('Registration failed:', error);
    console.error('GraphQL Errors:', error.graphQLErrors);
    console.error('Network Error:', error.networkError);
  }
}

const handleVerificationClose = () => {
  showVerificationModal.value = false;
  closeModal();
};

const handleResendVerification = async () => {
  try {
    console.log('Verification email resent');
  } catch (error) {
    console.error('Failed to resend verification email:', error);
  }
};

const handleChangeEmail = () => {
  showVerificationModal.value = false;
};

const resetForm = () => {
  registerForm.value.username = ''
  registerForm.value.password = ''
  registerForm.value.email = ''
}

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.signup-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
}

.signup-modal::before {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  z-index: -1;
}

.signup-content {
  position: relative;
  background: #1a1a1a;
  border-radius: 15px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.3s ease-out;
  margin: 1rem;
}

.signup-header {
  position: relative;
  margin-bottom: 2.5rem;
  text-align: left;
}

.signup-header h2 {
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  margin-left: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header-underline {
  height: 2px;
  background: #4CAF50;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  width: 60px;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.close-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  background: #333;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #4CAF50;
  transform: rotate(90deg);
}

.form-group {
  position: relative;
  margin-bottom: 1.8rem;
}

.form-group input {
  width: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
}

.form-group label {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  transition: all 0.3s;
  pointer-events: none;
  font-size: 1.1rem;
  font-weight: 500;
}

.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label {
  top: -12px;
  left: 10px;
  font-size: 0.95rem;
  color: #4CAF50;
  font-weight: 600;
}

.checkbox-container {
  margin: 1.5rem 0;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  color: #999;
  cursor: pointer;
  font-size: 0.95rem;
}

.checkbox-wrapper input {
  display: none;
}

.checkmark {
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-right: 12px;
  position: relative;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-wrapper input:checked + .checkmark {
  background: #4CAF50;
  border-color: #4CAF50;
}

.checkbox-wrapper input:checked + .checkmark:after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 16px;
}

.policy-text {
  color: #999;
  font-size: 0.85rem;
  margin: 1rem 0;
  line-height: 1.5;
}

.signup-btn {
  width: 100%;
  padding: 12px 30px;
  background: #4CAF50;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.signup-btn:hover {
  background: #66BB6A;
  transform: translateY(-2px);
}

.divider {
  text-align: center;
  margin: 2rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  color: #999;
  font-size: 1.1rem;
}

.social-btn {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.links {
  text-align: center;
  margin-top: 1.5rem;
}

.links a {
  color: #4CAF50;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.links a:hover {
  color: #66BB6A;
}

.secondary-links {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #999;
}

.separator {
  color: #999;
  margin: 0 8px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>