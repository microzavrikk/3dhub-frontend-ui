<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="profile-avatar">
        <img 
          v-if="avatarUrl" 
          :src="avatarUrl" 
          alt="User avatar"
          class="avatar-image"
        >
        <svg v-else width="100" height="100" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>

        <input 
          type="file" 
          ref="fileInput"
          @change="handleFileChange"
          accept="image/*"
          class="file-input"
        >
        
        <button 
          v-if="isCurrentUser"
          class="change-avatar-btn"
          @click="$refs.fileInput.click()"
        >
          Change Avatar
        </button>
      </div>
      <div class="profile-info">
        <h1>{{ username }}</h1>
        <p class="email">{{ user?.email }}</p>
      </div>
    </div>

    <div class="profile-content">
      <h2>My Models</h2>
      <div class="models-grid">
        <!-- Здесь будет грид с моделями пользователя -->
        <p v-if="!hasModels">No models uploaded yet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { UserAuthService } from '../../service/auth/user.auth.service';
import axios from 'axios';

const route = useRoute();
const username = computed(() => route.params.username as string);
// @ts-ignore
const fileInput = ref<HTMLInputElement | null>(null);
const avatarUrl = ref<string | null>(null);

const user = computed(() => {
  const userData = UserAuthService.getUser();
  return userData ? JSON.parse(userData) : null;
});

const isCurrentUser = computed(() => {
  return user.value?.username === username.value;
});

const hasModels = computed(() => false);

const handleFileChange = async (event: Event) => {
  // @ts-ignore
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const file = target.files[0];
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('username', username.value);

  try {
    await axios.post('http://localhost:4000/user-avatar/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Refresh avatar
    loadAvatar();
  } catch (error) {
    console.error('Failed to upload avatar:', error);
  }
};
const loadAvatar = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/user-avatar/get-avatar/${username.value}`);
    console.log("response.data", response.data);
    avatarUrl.value = response.data;
  } catch (error) {
    console.error('Failed to load avatar:', error);
    avatarUrl.value = null;
  }
};

onMounted(() => {
  loadAvatar();
});
</script>

<style scoped>
.profile-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  position: relative;
  width: 100px;
  height: 100px;
  color: #0ea5e9;
  background: rgba(14, 165, 233, 0.1);
  border-radius: 50%;
  padding: 1rem;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.file-input {
  display: none;
}

.change-avatar-btn {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.change-avatar-btn:hover {
  background: #0284c7;
}

.profile-info h1 {
  font-size: 2rem;
  color: #0c4a6e;
  margin: 0 0 0.5rem 0;
}

.email {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

.profile-content {
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-content h2 {
  color: #0c4a6e;
  margin: 0 0 1.5rem 0;
}

.models-grid {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}
</style>    