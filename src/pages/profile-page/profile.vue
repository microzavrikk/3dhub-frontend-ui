<template>
  <div class="profile-page">
    <div class="profile-banner">
      <div class="banner-overlay"></div>
      <img 
        v-if="profile?.backgroundUrl" 
        :src="profile.backgroundUrl" 
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
            v-if="profile?.avatarUrl" 
            :src="profile.avatarUrl" 
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
import { useQuery } from '@vue/apollo-composable';
import { GetProfileDocument } from '../../types';

const route = useRoute();
const router = useRouter();
const modelStore = useModelStore();
const username = computed(() => route.params.username as string);
// @ts-ignore
const fileInput = ref<HTMLInputElement | null>(null);
// @ts-ignore
const bannerInput = ref<HTMLInputElement | null>(null);
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
  } catch (error) {
    console.error('Failed to upload banner:', error);
  }
};

const loadUserAssets = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/assets-storage/assets/user/${user.value?.username}`);    
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
      width: '400px',
      height: '300px',
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
@import './profile.css';
</style>
