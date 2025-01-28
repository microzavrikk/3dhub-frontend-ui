<template>
  <div class="profile-page">
    <div class="profile-banner">
      <div class="banner-overlay"></div>
      <img 
        v-if="bannerUrl" 
        :src="bannerUrl" 
        alt="Profile banner"
        class="banner-image"
      >
      <div v-if="isCurrentUser" class="banner-upload">
        <input
          type="file"
          ref="bannerInput" 
          @change="handleBannerChange"
          accept="image/*"
          class="file-input"
        >
        <button class="change-banner-btn" @click="$refs.bannerInput.click()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4l2 3l3-4l4 5H5z"/>
          </svg>
          Change Banner
        </button>
      </div>
      <div class="banner-buttons">
        <button class="nav-btn home-btn" @click="$router.push('/')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/>
          </svg>
          Home
        </button>
        <button v-if="isCurrentUser" class="nav-btn logout-btn" @click="handleLogout">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          Logout
        </button>
      </div>
    </div>

    <div class="profile-main">
      <div class="profile-avatar-wrapper">
        <div class="profile-avatar">
          <img 
            v-if="avatarUrl" 
            :src="avatarUrl" 
            alt="User avatar"
            class="avatar-image"
          >
          <svg v-else class="default-avatar" viewBox="0 0 24 24">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2m4-9l5 5l5-5m-5-5v10"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="profile-info">
        <div class="profile-header">
          <h1 class="username">{{ username }}</h1>
          <span class="user-role" :class="user?.role.toLowerCase()">{{ user?.role }}</span>
        </div>
      </div>

      <div class="profile-content">
        <h2>My Models</h2>
        <div class="models-grid">
          <div v-if="hasModels" class="model-cards">
            <div v-for="model in filteredModels" :key="model.titleName" class="model-card">
              <Suspense>
                <template #default>
                  <AsyncModelLoader :model="model" />
                </template>
                <template #fallback>
                  <div class="loading-placeholder">Loading model...</div>
                </template>
              </Suspense>
              <h3 class="model-title">{{ model.titleName }}</h3>
              <p class="model-category">{{ model.category }}</p>
            </div>
          </div>
          <p v-else>No models uploaded yet</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UserAuthService } from '../../service/auth/user.auth.service';
import axios from 'axios';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';
import { defineComponent, h } from 'vue';
import { useModelStore } from '../../stores/modelStore';

const route = useRoute();
const router = useRouter();
const username = computed(() => route.params.username as string);
// @ts-ignore
const fileInput = ref<HTMLInputElement | null>(null);
// @ts-ignore
const bannerInput = ref<HTMLInputElement | null>(null);
const avatarUrl = ref<string | null>(null);
const bannerUrl = ref<string | null>(null);
const userAssets = ref<any[]>([]);
const modelFiles = ref(new Map());
const modelStores = ref(new Map());

const user = computed(() => {
  const userData = UserAuthService.getUser();
  return userData ? JSON.parse(userData) : null;
});

const isCurrentUser = computed(() => {
  return user.value?.username === username.value;
});

const handleLogout = () => {
  UserAuthService.logout();
  router.push('/');
};

const hasModels = computed(() => userAssets.value.length > 0);

const groupedModels = computed(() => {
  const models = new Map();
  
  userAssets.value.forEach(asset => {
    if (asset.category !== 'avatars') {
      if (!models.has(asset.titleName)) {
        models.set(asset.titleName, {
          titleName: asset.titleName,
          category: asset.category,
          files: []
        });
        if (!modelStores.value.has(asset.titleName)) {
          modelStores.value.set(asset.titleName, useModelStore());
        }
      }
      models.get(asset.titleName).files.push(asset);
    }
  });

  console.log("models", models);
  
  return Array.from(models.values());
});

const filteredModels = computed(() => {
  return groupedModels.value.filter(model => model.titleName !== username.value);
});

const loadModelFiles = async (model: any) => {
  const store = modelStores.value.get(model.titleName);
  if (!store) return null;

  // If files already loaded, return main model
  if (modelFiles.value.has(model.titleName)) {
    return modelFiles.value.get(model.titleName);
  }

  try {
    // Find first model file
    const mainModelFile = model.files[0];
    if (!mainModelFile) {
      console.error('No model files found');
      return null;
    }

    // Create File object from the main model URL
    const mainResponse = await fetch(mainModelFile.downloadUrl[0]);
    const mainBlob = await mainResponse.blob();
    console.log(`Main file ${mainModelFile.name} size:`, mainBlob.size);
    const mainFile = new File([mainBlob], mainModelFile.name, { 
      type: mainModelFile.name.endsWith('.gltf') ? 'model/gltf+json' : 'application/octet-stream'
    });

    // Clear store before adding new files
    store.clearModel();
    
    // Set main model file first
    await store.setModel(mainFile);
    
    // Load all associated files
    await Promise.all(
      model.files.map(async (file: any) => {
        if (file.name !== mainModelFile.name) {
          const response = await fetch(file.downloadUrl[0]);
          const blob = await response.blob();
          console.log(`Asset file ${file.name} size:`, blob.size);
          const assetFile = new File([blob], file.name, { 
            type: file.name.endsWith('.bin') ? 'application/octet-stream' : 'image/*'
          });
          await store.addAssetFile(assetFile);
        }
      })
    );

    // Cache main file
    modelFiles.value.set(model.titleName, mainFile);
    
    return mainFile;
  } catch (error) {
    console.error('Failed to load model files:', error);
    return null;
  }
};

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

const handleBannerChange = async (event: Event) => {
  // @ts-ignore
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const file = target.files[0];
  const formData = new FormData();
  formData.append('banner', file);
  formData.append('username', username.value);

  try {
    await axios.post('http://localhost:4000/user-avatar/upload-banner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Refresh banner
    loadBanner();
  } catch (error) {
    console.error('Failed to upload banner:', error);
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

const loadBanner = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/user-avatar/banner/${username.value}`);
    bannerUrl.value = response.data;
  } catch (error) {
    console.error('Failed to load banner:', error);
    bannerUrl.value = null;
  }
};

const loadUserAssets = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/assets-storage/assets/user/${user.value?.username}`);
    console.log("User assets:", response.data);
    userAssets.value = response.data;
  } catch (error) {
    console.error('Failed to load user assets:', error);
    userAssets.value = [];
  }
};

onMounted(() => {
  loadAvatar();
  loadBanner();
  loadUserAssets();
});

const AsyncModelLoader = defineComponent({
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  async setup(props) {
    const modelFile = await loadModelFiles(props.model);
    if (!modelFile) {
      return () => h('div', 'Failed to load model');
    }
    console.log("modelFile", modelFile);
    
    return () => h(ThreeDScene, { 
      modelFile,
      width: '400px',
      height: '300px',
      class: 'model-preview'
    });
  }
});

// Clean up resources on unmount
onUnmounted(() => {
  modelFiles.value.clear();
  modelStores.value.forEach(store => store.clearModel());
  modelStores.value.clear();
});
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.profile-banner {
  position: relative;
  height: 300px;
  background: #111111;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
  z-index: 1;
}

.banner-upload {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.change-banner-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(40, 40, 40, 0.8);
  color: #4CAF50;
  border: 2px solid #4CAF50;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.change-banner-btn:hover {
  background: #4CAF50;
  color: white;
  transform: scale(1.05);
}

.banner-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 20px;
  z-index: 1000;
  background: rgba(40, 40, 40, 0.5);
  padding: 10px 20px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 700;
  transition: all 0.3s ease;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  background: transparent;
  cursor: pointer;
}

.nav-btn:hover {
  color: #4CAF50;
  transform: translateY(-2px);
}

.logout-btn {
  color: #ff4d4d;
}

.logout-btn:hover {
  color: #ff6b6b;
}

.profile-main {
  max-width: 1200px;
  margin: -80px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.profile-avatar-wrapper {
  margin-bottom: 30px;
}

.profile-avatar {
  width: 160px;
  height: 160px;
  background: #1a1a1a;
  border-radius: 15px;
  border: 1px solid #333;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-avatar {
  width: 100%;
  height: 100%;
  padding: 2rem;
  color: #4CAF50;
}

.change-avatar-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(40, 40, 40, 0.8);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #4CAF50;
}

.change-avatar-btn:hover {
  background: #4CAF50;
  color: white;
  transform: scale(1.1);
}

.profile-info {
  margin-bottom: 60px;
}

.username {
  font-size: 48px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
  margin-right: 20px;
}

.username::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #ff4d4d, #4CAF50);
}

.user-role {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Arial', sans-serif;
}

.user-role.admin {
  background: linear-gradient(45deg, #ff4d4d, #ff8c00);
  color: white;
}

.user-role.user {
  background: linear-gradient(45deg, #4CAF50, #45b1e8);
  color: white;
}

.profile-content {
  padding: 40px;
  background: #111111;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  margin-bottom: 60px;
}

.profile-content h2 {
  color: #4CAF50;
  font-size: 32px;
  margin-bottom: 40px;
  text-transform: uppercase;
  text-align: center;
}

.models-grid {
  min-height: 200px;
}

.model-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.model-card {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #333;
  transition: transform 0.3s ease;
}

.model-card:hover {
  transform: translateY(-10px);
  border-color: #4CAF50;
}

.model-title {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 15px 0;
}

.model-category {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  background: #4CAF50;
  color: #fff;
}

.loading-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  border-radius: 15px;
  color: #999;
  font-size: 16px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.file-input {
  display: none;
}

@media (max-width: 768px) {
  .profile-banner {
    height: 200px;
  }
  
  .username {
    font-size: 36px;
  }
  
  .profile-content {
    padding: 20px;
  }
  
  .model-cards {
    grid-template-columns: 1fr;
  }
}
</style>    