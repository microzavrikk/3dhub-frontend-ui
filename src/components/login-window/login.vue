<template>
  <div class="login-modal" @click.self="closeModal">
    <div class="login-content">
      <div class="login-header">
        <h2>Login</h2>
        <div class="header-underline"></div>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <input type="email" id="email" v-model="email" required placeholder=" " />
          <label for="email">Email</label>
        </div>

        <div class="form-group">
          <input type="password" id="password" v-model="password" required placeholder=" " />
          <label for="password">Password</label>
        </div>

        <div class="remember-me-container">
          <label class="checkbox-container">
            <input type="checkbox" v-model="rememberMe" />
            <span class="checkmark"></span>
            Remember me
          </label>
        </div>

        <button type="submit" class="login-btn">
          Log In
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
        <a href="#" class="signup-link">Create account</a>
        <span class="separator">•</span>
        <a href="#" class="reset-link">Forgot password?</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useLoginMutation } from '../../types';
import { UserAuthService } from '../../service/auth/user.auth.service';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const emit = defineEmits(['close']);

const { mutate: login } = useLoginMutation();

const handleLogin = async () => {
  try {
    const response = await login({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    });
    console.log(response.data.Auth.login.accessToken);
    if (response.data.Auth.login.accessToken) {
      UserAuthService.setAuthToken(response.data.Auth.login.accessToken);
      UserAuthService.setUser(response.data.Auth.login.user);
      closeModal();
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.login-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.login-modal::before {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: -1;
}

.login-content {
  position: relative;
  background: linear-gradient(145deg, #1e1e2e, #2d2d44);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.3s ease-out;
  margin: 1rem;
}

.login-header {
  position: relative;
  margin-bottom: 2.5rem;
  text-align: left;
}

.login-header h2 {
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  margin-left: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header-underline {
  height: 1px;
  background: rgba(255, 255, 255, 0.8);
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  width: 60px;
}

.close-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  background: #363649;
  border: none;
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
  background: #4a4a66;
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
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #7d5fff;
  box-shadow: 0 0 15px rgba(125, 95, 255, 0.3);
}

.form-group label {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0a0b8;
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
  color: #7d5fff;
  font-weight: 600;
}

.remember-me-container {
  margin: 1.5rem 0;
}

.checkbox-container {
  display: flex;
  align-items: center;
  color: #a0a0b8;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
}

.checkbox-container input {
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

.checkbox-container input:checked + .checkmark {
  background: #7d5fff;
  border-color: #7d5fff;
}

.checkbox-container input:checked + .checkmark:after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(45deg, #7d5fff, #7158e2);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(125, 95, 255, 0.4);
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
  color: #a0a0b8;
  font-size: 1.1rem;
}

.social-btn {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
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

.social-btn svg {
  flex-shrink: 0;
}

.links {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.links a {
  color: #7d5fff;
  text-decoration: none;
  transition: color 0.3s;
}

.links a:hover {
  color: #9780ff;
}

.separator {
  color: #a0a0b8;
  margin: 0 10px;
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