<template>
  <div class="profile-page">
    <Header />
    <div class="profile-banner">
      <div class="banner-overlay"></div>
      <div class="profile-avatar-container">
        <div class="profile-avatar">
          <img 
            v-if="profile?.avatarUrl" 
            :src="profile.avatarUrl" 
            alt="User avatar"
            class="avatar-image"
          >
          <svg v-else class="default-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 5h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
            </svg>
          </button>
        </div>
        
        <div class="profile-info">
          <div class="username-container">
            <div class="user-main-info">
              <h1 class="username">{{ username }}</h1>
            </div>
            <div class="stats-container">
              <button v-if="isCurrentUser" class="management-btn" @click="$router.push('/subscription-history')">
                Management
              </button>
              <div class="user-stats">
                <div class="stat-box">
                  <span class="stat-number">5K</span>
                  <span class="stat-label">followers</span>
                </div>
                <span class="stat-dot">•</span>
                <div class="stat-box">
                  <span class="stat-number">1.2K</span>
                  <span class="stat-label">following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="banner-buttons">
        <button class="nav-btn" @click="$router.push('/')" title="Home">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/>
          </svg>
        </button>
        <button class="nav-btn" @click="$router.push('/settings')" title="Settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"/>
          </svg>
        </button>
        <button v-if="isCurrentUser" class="nav-btn" @click="handleLogout" title="Logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="models-container">
      <div v-if="hasModels" class="models-grid">
        <div v-for="model in filteredModels" :key="model.titleName" class="model-item">
          <Suspense>
            <template #default>
              <AsyncModelLoader :model="model" />
            </template>
            <template #fallback>
              <div class="loading-placeholder">
                <svg class="spinner" viewBox="0 0 50 50">
                  <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
                </svg>
              </div>
            </template>
          </Suspense>
          <div class="model-info">
            <div class="model-header">
              <h3 class="model-title">{{ model.titleName }}</h3>
              <div class="model-stats">
                <div class="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span>0</span>
                </div>
                <div class="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span>0</span>
                </div>
                <div class="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-models">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
        </svg>
        <p>No models uploaded yet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UserAuthService } from '../../service/auth/user.auth.service';
import Header from '../../components/header/header.vue';
import axios from 'axios';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';
import { defineComponent, h } from 'vue';
import { useModelStore } from '../../stores/modelStore';
import { useQuery } from '@vue/apollo-composable';
import { GetProfileDocument } from '../../types';

const route = useRoute();
const router = useRouter();
const modelStore = useModelStore();
const username = computed(() => route.params.username as string);
// @ts-ignore
const fileInput = ref<HTMLInputElement | null>(null);
const userAssets = ref<any[]>([]);
const modelFiles = ref(new Map());

const user = computed(() => {
  const userData = UserAuthService.getUser();
  return userData ? JSON.parse(userData) : null;
});

const { result } = useQuery(GetProfileDocument, {
  userId: user.value?.id
});

const profile = computed(() => result.value?.getProfile);

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
      }
      models.get(asset.titleName).files.push(asset);
    }
  });
  
  return Array.from(models.values());
});

const filteredModels = computed(() => {
  return groupedModels.value.filter(model => model.titleName !== username.value);
});

const loadModelFiles = async (model: any) => {
  console.log("model", model);
  if (!modelStore) return null;

  try {
    // Find .gltf and .bin files
    const gltfFile = model.files.find((file: any) => file.name.endsWith('.gltf'));
    const binFile = model.files.find((file: any) => file.name.endsWith('.bin'));

    if (!gltfFile || !binFile) {
      console.error('Missing required model files');
      return null;
    }

    // Load .gltf file
    const gltfResponse = await fetch(gltfFile.downloadUrl[0]);
    const gltfBlob = await gltfResponse.blob();
    console.log(`GLTF file ${gltfFile.name} size:`, gltfBlob.size);
    const gltfModelFile = new File([gltfBlob], gltfFile.name, { 
      type: 'model/gltf+json'
    });

    // Load .bin file
    const binResponse = await fetch(binFile.downloadUrl[0]);
    const binBlob = await binResponse.blob();
    console.log(`BIN file ${binFile.name} size:`, binBlob.size);
    const binModelFile = new File([binBlob], binFile.name, {
      type: 'application/octet-stream'
    });

    console.log("gtlfBlob", gltfBlob);
    console.log("binBlob", binBlob);

    // Set main .gltf file
    await modelStore.setModel(gltfModelFile);
    
    // Add .bin file as asset
    await modelStore.addAssetFile(binModelFile);

    // Load remaining asset files (textures etc)
    await Promise.all(
      model.files.map(async (file: any) => {
        if (file.name !== gltfFile.name && file.name !== binFile.name) {
          const response = await fetch(file.downloadUrl[0]);
          const blob = await response.blob();
          console.log(`Asset file ${file.name} size:`, blob.size);
          const assetFile = new File([blob], file.name, { 
            type: 'image/*'
          });
          await modelStore.addAssetFile(assetFile);
        }
      })
    );

    // Return only the GLTF file
    return gltfModelFile;
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
  } catch (error) {
    console.error('Failed to upload avatar:', error);
  }
};

const loadUserAssets = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/assets-storage/assets/user/${user.value?.username}`);
    console.log("response", response);
    const filteredAssets = response.data.filter((asset: any) => asset.titleName !== username.value);

    console.log("filteredAssets", filteredAssets);
    
    for (const asset of filteredAssets) {
      console.log("asset", asset);
      try {
        const binaryResponse = await axios.get(asset.downloadUrl[0], {
          responseType: 'arraybuffer'
        });
        console.log("binaryResponse", binaryResponse);
        
        // Convert buffer to text
        const textDecoder = new TextDecoder();
        const fileContent = textDecoder.decode(binaryResponse.data);        
        asset.downloadUrl[0] = URL.createObjectURL(new Blob([binaryResponse.data]));
        console.log(`Created blob URL for ${asset.fileName}:`, asset.downloadUrl[0]);
      } catch (error) {
        console.error(`Failed to load binary content for ${asset.fileName}:`, error);
      }
    }
    userAssets.value = filteredAssets;
  } catch (error) {
    console.error('Failed to load user assets:', error);
    userAssets.value = [];
  }
};

onMounted(() => {
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
    console.log("props.model", props.model);
    const modelFile = await loadModelFiles(props.model);
    if (!modelFile) {
      return () => h('div', 'Failed to load model');
    }
    console.log("modelFile", modelFile);

    return () => h(ThreeDScene, { 
      modelFile: modelFile,
      width: '100%',
      height: '250px', // Changed from 400px to 250px
      class: 'model-preview'
    });
  }
});

// Clean up resources on unmount
onUnmounted(() => {
  modelFiles.value.clear();
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
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  background: #1a1a2e;
  transition: transform 0.3s ease;
  border: none;
  border-radius: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-avatar {
  width: 60%;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  opacity: 0.8;
}

.change-avatar-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: #ffffff;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar:hover .change-avatar-btn {
  opacity: 1;
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

.profile-page {
  max-width: 100%;
  margin: 0;
  background: #1F2223;
  min-height: 100vh;
  padding-top: 0;
  color: #e0e0e0;
}

.profile-banner {
  position: relative;
  height: 200px;
  background: #121212;
  overflow: hidden;
  margin-top: 0;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 1));
}

.profile-avatar-container {
  position: absolute;
  bottom: 30px;
  left: 40px;
  display: flex;
  align-items: flex-end;
  gap: 25px;
  z-index: 2;
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 15px;
  overflow: hidden;
  background: #1a1a2e;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
}

.profile-avatar:hover {
  transform: translateY(-5px);
}

.avatar-image, .default-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar-image:hover {
  transform: scale(1.1);
}

.change-avatar-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: #ffffff;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar:hover .change-avatar-btn {
  opacity: 1;
}

.profile-info {
  padding-bottom: 5px;
  margin-bottom: 12px;
}

.username-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-main-info {
  display: flex;
  align-items: center;
  margin-top: -20px;
}

.username {
  font-size: 26px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.3px;
  line-height: 1.2;
}

.stats-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 0;
}

.management-btn {
  padding: 5px 14px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #4CAF50;
  height: fit-content;
}

.management-btn:hover {
  background: #45a049;
  transform: translateY(-1px);
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  margin-left: 0;
}

.stat-box {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-number {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.stat-label {
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
  text-transform: lowercase;
}

.stat-dot {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 600;
  margin: 0 2px;
}

.models-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 50px 100px 50px;
  margin-left: -10px; /* Added margin-left */
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.model-item {
  background: white; /* Darker background */
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.model-preview {
  width: 100%;
  height: 250px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.model-info {
  padding: 15px;
  background: white; /* Even darker background for info panel */
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
}

.model-title {
  color: #ffffff;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.model-stats {
  display: flex;
  gap: 15px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #a0a0a0;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  background: #0f0f1a; /* Match model-item background */
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;
}

.spinner .path {
  stroke: #63e6be;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.no-models {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  color: #a0a0a0;
  gap: 25px;
}

.file-input {
  display: none;
}
</style>
