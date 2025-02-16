<template>
  <div class="page-wrapper">
    <Header />
    <div class="model-page">
      <div class="content-layout">
        <main class="main-content">
          <div class="model-viewer">
            <div class="model-viewer-border">
              <AsyncModelLoader />
            </div>
          </div>

          <div class="model-info">
            <h1 class="model-title">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              {{ modelData[0]?.name }}
            </h1>
            
            <div class="model-meta">
              <div class="creator">
                <div class="avatar-wrapper">
                  <img 
                    :src="profile?.avatarUrl || ''" 
                    @click="fileInput?.click()"
                    class="avatar-image"
                  >
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileChange"
                  hidden
                />
                <div class="creator-info">
                  <router-link :to="`/profile/${modelData[0]?.ownerId}`" class="username">
                    {{ modelData[0]?.ownerId }}
                    <svg class="verified-badge" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </router-link>
                  <div class="stats">
                    <span class="followers">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      10.5K followers
                    </span>
                    <span class="separator">•</span>
                    <span class="uploads">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      </svg>
                      24 models
                    </span>
                  </div>
                </div>
              </div>

              <div class="action-buttons">
                <button class="primary-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download
                </button>
                <button class="secondary-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Like
                </button>
                <button class="secondary-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Share
                </button>
              </div>
            </div>

            <div class="model-details">
              <div class="metadata-grid">
                <div class="metadata-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  <div class="metadata-content">
                    <span class="metadata-label">Category</span>
                    <span class="metadata-value highlight">{{ modelData[0]?.category }}</span>
                  </div>
                </div>
                <div class="metadata-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <div class="metadata-content">
                    <span class="metadata-label">Price</span>
                    <span class="metadata-value price">${{ modelData[0]?.price }}</span>
                  </div>
                </div>
                <div class="metadata-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <div class="metadata-content">
                    <span class="metadata-label">Downloads</span>
                    <span class="metadata-value">2.4K</span>
                  </div>
                </div>
                <div class="metadata-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <div class="metadata-content">
                    <span class="metadata-label">Likes</span>
                    <span class="metadata-value">1.2K</span>
                  </div>
                </div>
              </div>

              <div class="description">
                <p>{{ modelData[0]?.description }}</p>
              </div>
            </div>
          </div>

          <div class="comments-section">
            <h2 class="comments-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Comments
              <span class="comments-count">({{ comments.length }})</span>
            </h2>

            <div class="comment-form">
              <div class="comment-form-avatar">
                <img :src="profile?.avatarUrl || ''" class="user-avatar">
              </div>
              <div class="comment-input-wrapper">
                <textarea 
                  v-model="newComment" 
                  placeholder="Share your thoughts about this model..."
                  class="comment-input"
                ></textarea>
                <div class="comment-form-actions">
                  <button class="cancel-btn">Cancel</button>
                  <button @click="submitComment" class="submit-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 2L11 13"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2z"/>
                    </svg>
                    Post Comment
                  </button>
                </div>
              </div>
            </div>

            <div class="comments-list">
              <div v-for="comment in comments" :key="comment.id" class="comment">
                <div class="comment-avatar-wrapper">
                  <img :src="profile?.avatarUrl || ''" class="comment-avatar">
                  <div class="comment-avatar-status"></div>
                </div>
                <div class="comment-content">
                  <div class="comment-header">
                    <div class="comment-author-info">
                      <span class="comment-author">{{ comment.author }}</span>
                      <span class="author-badge">Creator</span>
                    </div>
                    <div class="comment-meta">
                      <span class="comment-date">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        2 days ago
                      </span>
                      <button class="more-actions">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="1"/>
                          <circle cx="19" cy="12" r="1"/>
                          <circle cx="5" cy="12" r="1"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="comment-text">{{ comment.text }}</p>
                  <div class="comment-actions">
                    <button class="action-btn like-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                      </svg>
                      <span>24</span>
                    </button>
                    <button class="action-btn reply-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 10 20 15 15 20"/>
                        <path d="M4 4v7a4 4 0 0 0 4 4h12"/>
                      </svg>
                      Reply
                    </button>
                    <button class="action-btn share-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside class="sidebar">
          <h2 class="sidebar-title">Proposed Models</h2>
          <div class="proposed-list">
            <div v-for="model in groupedRandomModels" :key="model.titleName" class="proposed-item">
              <div class="preview">
                <AsyncProposedModelLoader :model-files="model.files" />
              </div>
              <div class="proposed-info">
                <h3 class="model-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                  {{ model.titleName }}
                </h3>
                <span class="creator-name">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  by <span class="creator-highlight">{{ model.files[0].ownerId }}</span>
                </span>
                <div class="proposed-meta">
                  <span class="views">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    2.3K views
                  </span>
                  <span class="time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    2 days ago
                  </span>
                </div>
                <div class="model-tags">
                  <span class="tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                      <line x1="7" y1="7" x2="7.01" y2="7"/>
                    </svg>
                    {{ model.category }}
                  </span>
                  <span class="tag price-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    ${{ model.price }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { defineComponent, h } from 'vue';
import gql from 'graphql-tag';
import axios from 'axios';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';
import { useModelStore } from '../../stores/modelStore';
import Header from '../../components/header/header.vue';
import { UserAuthService } from '../../service/auth/user.auth.service';
import { GetProfileDocument } from '../../types';


const route = useRoute();
const modelStore = useModelStore();
const titleName = computed(() => route.query.titleName as string);
//@ts-ignore
const fileInput = ref<HTMLInputElement | null>(null);

const user = computed(() => {
  const userData = UserAuthService.getUser();
  return userData ? JSON.parse(userData) : null;
});

const userId = computed(() => user.value?.id);

const { result, loading, error } = useQuery(
  gql`
    query GetModelByTitleName($titleName: String!) {
      AssetsQuery {
        getFileByTitleName(titleName: $titleName) {
          id
          file
          price
          awsLocation
          titleName
          name
          description
          category
          tags
          ownerId
          publicAccess
          createdAt
          updatedAt
        }
      }
    }
  `,
  {
    titleName: titleName
  }
);

const modelData = computed(() => result.value?.AssetsQuery.getFileByTitleName || []);

const { result: profileResult } = useQuery(GetProfileDocument, {
  userId: user.value?.id
});

const profile = computed(() => profileResult.value?.getProfile);
console.log('Profile data:', profile.value);

const { result: randomModelsResult } = useQuery(
  gql`
    query GetRandomModels {
      AssetsQuery {
        getRandomAssets(count: 6) {
          id
          file
          price
          awsLocation
          titleName
          name
          description
          category
          tags
          ownerId
          publicAccess
          createdAt
          updatedAt
        }
      }
    }
  `
);

const handleFileChange = async (event: Event) => {
  //@ts-ignore
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const file = target.files[0];
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('username', modelData.value[0]?.ownerId);

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

const groupedRandomModels = computed(() => {
  const models = new Map();
  
  const randomModels = randomModelsResult.value?.AssetsQuery.getRandomAssets || [];
  
  randomModels.forEach((asset: any) => {
    if (!models.has(asset.titleName)) {
      models.set(asset.titleName, {
        titleName: asset.titleName,
        category: asset.category,
        price: asset.price,
        files: []
      });
    }
    models.get(asset.titleName).files.push(asset);
  });
  console.log("123123", models);
  return Array.from(models.values());
});

const loadModelFiles = async (modelFiles: any[]) => {
  if (!modelStore) return null;

  try {
    const gltfFile = modelFiles.find(file => file.file[0].endsWith('.gltf'));
    const binFile = modelFiles.find(file => file.file[0].endsWith('.bin'));

    if (!gltfFile || !binFile) {
      console.error('Missing required model files');
      return null;
    }

    const gltfResponse = await fetch(gltfFile.awsLocation);
    const gltfBlob = await gltfResponse.blob();
    const gltfModelFile = new File([gltfBlob], gltfFile.file[0].split('/').pop() || 'model.gltf', { 
    });

    const binResponse = await fetch(binFile.awsLocation);
    const binBlob = await binResponse.blob();
    const binModelFile = new File([binBlob], binFile.file[0].split('/').pop() || 'model.bin', {
      type: 'application/octet-stream'
    });

    await modelStore.setModel(gltfModelFile);
    await modelStore.addAssetFile(binModelFile);

    await Promise.all(
      modelFiles.map(async (file) => {
        if (!file.file[0].endsWith('.gltf') && !file.file[0].endsWith('.bin')) {
          const response = await fetch(file.awsLocation);
          const blob = await response.blob();
          const assetFile = new File([blob], file.file[0].split('/').pop() || 'asset', {
            type: 'image/*'
          });
          await modelStore.addAssetFile(assetFile);
        }
      })
    );

    return gltfModelFile;
  } catch (error) {
    console.error('Failed to load model files:', error);
    return null;
  }
};

const AsyncModelLoader = defineComponent({
  setup() {
    const modelFile = ref<File | null>(null);

    const loadModel = async () => {
      if (modelData.value?.length) {
        modelFile.value = await loadModelFiles(modelData.value);
      }
    };

    watch(modelData, (newValue) => {
      if (newValue?.length) {
        loadModel();
      }
    }, { immediate: true });

    onMounted(() => {
      if (modelData.value?.length) {
        loadModel();
      }
    });

    return () => {
      if (loading.value) {
        return h('div', { class: 'loading' }, 'Loading...');
      }
      if (error.value) {
        return h('div', { class: 'error' }, `Error: ${error.value.message}`);
      }
      if (!modelFile.value) {
        return h('div', { class: 'loading' }, 'Loading model...');
      }
      return h(ThreeDScene, { 
        modelFile: modelFile.value,
        width: '100%',
        height: '800px'
      });
    };
  }
});

const AsyncProposedModelLoader = defineComponent({
  props: {
    modelFiles: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const modelFile = ref<File | null>(null);

    const loadProposedModel = async () => {
      modelFile.value = await loadModelFiles(props.modelFiles);
    };

    onMounted(() => {
      loadProposedModel();
    });

    return () => {
      if (!modelFile.value) {
        return h('div', { class: 'loading' }, 'Loading...');
      }
      return h(ThreeDScene, {
        modelFile: modelFile.value,
        width: '100%',
        height: '200px',
        zoomLevel: 1.5,
      });
    };
  }
});

const comments = ref([
  { id: 1, author: 'User1', text: 'Great model!' },
  { id: 2, author: 'User2', text: 'Amazing work!' }
]);

const newComment = ref('');

const submitComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({
      id: comments.value.length + 1,
      author: 'CurrentUser',
      text: newComment.value.trim()
    });
    newComment.value = '';
  }
};

</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%);
  position: relative;
  color: #fff;
  overflow: hidden;
}

.page-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 15% 50%, rgba(25, 25, 25, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 85% 30%, rgba(30, 30, 30, 0.15) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.model-page {
  padding: 32px 48px;
  position: relative;
  z-index: 2;
}

.content-layout {
  max-width: 2000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 500px;
  gap: 32px;
  padding: 0 24px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1400px;
}

.model-viewer {
  background: rgba(15, 15, 15, 0.9);
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/9;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  padding: 3px;
  border: 3px solid #4CAF50;
}

.model-viewer-border {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.model-info {
  background: rgba(15, 15, 15, 0.9);
  border-radius: 16px;
  padding: 32px;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.model-info h1 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.model-info h1 svg {
  color: #4CAF50;
  flex-shrink: 0;
}

.model-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(40, 40, 40, 0.8);
  margin-bottom: 24px;
}

.creator {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(76, 175, 80, 0.1);
  transition: all 0.3s ease;
}

.creator:hover {
  background: rgba(30, 30, 30, 0.8);
  border-color: rgba(76, 175, 80, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.avatar-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  border: 3px solid #4CAF50;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.2);
}

.avatar-image:hover {
  transform: scale(1.05);
  border-color: #81C784;
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #1a1a1a;
}

.avatar-status.online {
  background: #4CAF50;
}

.creator-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.username {
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

.username:hover {
  color: #4CAF50;
}

.verified-badge {
  color: #4CAF50;
}

.stats {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #999;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.followers, .uploads {
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}

.followers:hover, .uploads:hover {
  color: #81C784;
}

.separator {
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 16px;
}

.primary-btn, .secondary-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 24px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.primary-btn {
  background: #4CAF50;
  color: white;
  border: none;
}

.secondary-btn {
  background: rgba(30, 30, 30, 0.9);
  color: white;
  border: 1px solid rgba(40, 40, 40, 0.8);
}

.primary-btn:hover {
  background: #43A047;
  transform: translateY(-1px);
}

.secondary-btn:hover {
  background: rgba(40, 40, 40, 0.9);
  transform: translateY(-1px);
}

.metadata-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.metadata-item {
  background: rgba(30, 30, 30, 0.9);
  padding: 24px;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: all 0.3s ease;
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.metadata-item:hover {
  transform: translateY(-2px);
  border-color: rgba(76, 175, 80, 0.3);
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.1);
}

.metadata-item svg {
  color: #4CAF50;
  flex-shrink: 0;
}

.metadata-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metadata-label {
  color: #999;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Inter', sans-serif;
}

.metadata-value {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
}

.metadata-value.highlight {
  color: #4CAF50;
}

.metadata-value.price {
  color: #81C784;
}

.description {
  color: #999;
  line-height: 1.8;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  background: rgba(30, 30, 30, 0.9);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.description p {
  margin: 0;
}

.comments-section {
  margin-top: 48px;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.comments-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.comments-title svg {
  color: #4CAF50;
}

.comments-count {
  color: #666;
  font-size: 18px;
  font-weight: 500;
}

.comment-form {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  background: rgba(40, 40, 40, 0.6);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.comment-form-avatar {
  position: relative;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #4CAF50;
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4CAF50;
  border: 2px solid #1a1a1a;
}

.comment-input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 80px;
}

.comment-input {
  width: 80%;
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(76, 175, 80, 0.1);
  border-radius: 12px;
  padding: 16px;
  color: white;
  resize: vertical;
  min-height: 24px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

.comment-input:focus {
  outline: none;
  border-color: #4CAF50;
  background: rgba(20, 20, 20, 0.8);
}

.comment-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn, .submit-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cancel-btn {
  background: transparent;
  color: #999;
  border: 1px solid #333;
}

.cancel-btn:hover {
  border-color: #666;
  color: #fff;
}

.submit-btn {
  background: #4CAF50;
  color: white;
  border: none;
}

.submit-btn:hover {
  background: #66BB6A;
  transform: translateY(-2px);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment {
  display: flex;
  gap: 20px;
  background: rgba(40, 40, 40, 0.6);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(76, 175, 80, 0.1);
  transition: all 0.3s ease;
}

.comment:hover {
  background: rgba(40, 40, 40, 0.8);
  transform: translateY(-2px);
}

.comment-avatar-wrapper {
  position: relative;
}

.comment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(76, 175, 80, 0.3);
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.comment-author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.comment-author {
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.author-badge {
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.comment-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.comment-date {
  color: #999;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.more-actions {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.more-actions:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.comment-text {
  color: #ccc;
  line-height: 1.6;
  font-size: 15px;
  margin-bottom: 16px;
  font-family: 'Inter', sans-serif;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.like-btn.active {
  color: #4CAF50;
}

.like-btn:hover {
  color: #4CAF50;
}

.sidebar {
  background: rgba(15, 15, 15, 0.9);
  border-radius: 16px;
  padding: 24px;
  height: fit-content;
  position: sticky;
  top: 32px;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
.sidebar-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 24px;
  padding: 0 8px;
  background: linear-gradient(90deg, #4CAF50, #81C784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
  font-family: 'Inter', sans-serif;
}

.proposed-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.proposed-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(30, 30, 30, 0.9);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.proposed-item:hover {
  background: rgba(40, 40, 40, 0.9);
  transform: translateY(-2px);
  border-color: rgba(76, 175, 80, 0.3);
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.1);
}

.preview {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(15, 15, 15, 0.9);
  border: 2px solid rgba(76, 175, 80, 0.2);
}

.proposed-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
}
.model-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
  color: white;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.creator-name {
  color: #999;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
}

.creator-highlight {
  color: #81C784;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.proposed-meta {
  display: flex;
  gap: 16px;
  color: #999;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.views, .time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.model-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: rgba(76, 175, 80, 0.1);
  color: #81C784;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
}

.price-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-weight: 700;
}

@media (max-width: 1400px) {
  .content-layout {
    grid-template-columns: minmax(0, 1fr) 450px;
    gap: 24px;
  }
  
  .model-page {
    padding: 24px;
  }
}

@media (max-width: 1200px) {
  .content-layout {
    grid-template-columns: 1fr;
    max-width: 900px;
  }
  
  .sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .model-page {
    padding: 16px;
  }
  
  .content-layout {
    padding: 0 16px;
  }
  
  .model-meta {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .metadata-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>