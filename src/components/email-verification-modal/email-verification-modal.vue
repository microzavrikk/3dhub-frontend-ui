<template>
  <div class="verification-modal" @click.self="closeModal">
    <div class="verification-content">
      <div class="verification-header">
        <h2>Verify your email</h2>
        <div class="header-underline"></div>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <div class="verification-body">
        <div class="email-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#7d5fff"/>
          </svg>
        </div>

        <h3 class="verification-title">Check your inbox</h3>
        
        <p class="verification-text">
          We've sent a verification link to
          <span class="email-highlight">{{ userEmail }}</span>
        </p>

        <p class="verification-description">
          Please click the link in the email to verify your account. 
          If you don't see the email, check your spam folder.
        </p>

        <button class="resend-btn" @click="handleResendEmail" :disabled="isResendDisabled">
          {{ resendButtonText }}
        </button>

        <div class="action-links">
          <button class="change-email-btn" @click="handleChangeEmail">
            Change email address
          </button>
          <span class="separator">•</span>
          <a href="/help" class="help-link">Need help?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  userEmail: string
}>();

const emit = defineEmits(['close', 'resend', 'changeEmail']);

const RESEND_TIMEOUT = 60; // seconds
const countdown = ref(0);
const isResendDisabled = ref(false);

const resendButtonText = computed(() => {
  if (countdown.value > 0) {
    return `Resend email (${countdown.value}s)`;
  }
  return 'Resend verification email';
});

const startCountdown = () => {
  isResendDisabled.value = true;
  countdown.value = RESEND_TIMEOUT;
  
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      isResendDisabled.value = false;
    }
  }, 1000);
};

const handleResendEmail = () => {
  emit('resend');
  startCountdown();
};

const handleChangeEmail = () => {
  emit('changeEmail');
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.verification-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.verification-content {
  background: linear-gradient(145deg, #1e1e2e, #2d2d44);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.4s ease-out;
}

.verification-header {
  position: relative;
  margin-bottom: 2rem;
  text-align: left;
}

.verification-header h2 {
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

.verification-body {
  text-align: center;
  padding: 1rem 0;
}

.email-icon {
  margin: 1rem auto 2rem;
  width: 64px;
  height: 64px;
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.verification-title {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.verification-text {
  color: #a0a0b8;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.email-highlight {
  color: #7d5fff;
  font-weight: 600;
}

.verification-description {
  color: #a0a0b8;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.resend-btn {
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

.resend-btn:disabled {
  background: #363649;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.resend-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(125, 95, 255, 0.4);
}

.action-links {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.change-email-btn, 
.help-link {
  background: none;
  border: none;
  color: #7d5fff;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s;
}

.change-email-btn:hover,
.help-link:hover {
  color: #9780ff;
}

.separator {
  color: #a0a0b8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style> 