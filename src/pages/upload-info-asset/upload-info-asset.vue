<template>
  <div class="model-edit-container">
    <div class="content-wrapper">
      <div class="model-preview-section" style="flex: 2;">
        <div class="preview-header-bar">
          <h2 class="preview-header">3D Preview</h2>
          <div class="preview-controls">
            <button class="control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              Fullscreen
            </button>
            <button class="control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Settings
            </button>
          </div>
        </div>
        <div class="preview-container">
          <div class="model-preview">
            <div class="model-preview-wrapper">
              <div class="model-canvas-container">
                <ThirdDScene 
                  :model-file="modelFile || undefined"
                  class="model-canvas"
                  :camera-position="{ x: 5, y: 2, z: 5 }"
                  :ambient-light="{ intensity: 0.7, color: '#ffffff' }"
                  :directional-light="{ intensity: 0.8, position: { x: 10, y: 10, z: 10 } }"
                  :shadow-enabled="true"
                  :environment-map="'studio'"
                  :background-color="'#f5f5f5'"
                  :grid-enabled="true"
                  :orbit-controls="{ enableDamping: true, dampingFactor: 0.05 }"
                  :post-processing="{
                    bloom: { enabled: true, intensity: 0.5 },
                    ambientOcclusion: { enabled: true },
                    antialiasing: true
                  }"
                />
                <div class="model-overlay">
                  <div class="model-loading" v-if="!modelFile">
                    <div class="loading-spinner"></div>
                    <span>Loading 3D Model...</span>
                  </div>
                </div>
              </div>
              <div class="model-controls">
                <button class="control-btn rotate active">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                  </svg>
                  Orbit
                </button>
                <button class="control-btn pan">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M21 12H3M12 21V3"/>
                  </svg>
                  Pan
                </button>
                <button class="control-btn zoom">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                  Zoom
                </button>
                <button class="control-btn reset">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64"/>
                    <path d="M21 3v6h-6"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64"/>
                    <path d="M3 21v-6h6"/>
                  </svg>
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div class="preview-info">
            <div v-if="modelFile" class="upload-status">
              <div class="status-icon success">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>Model Successfully Uploaded</span>
            </div>
            <div class="model-stats">
              <div class="stat-item">
                <span class="stat-label">File Size</span>
                <span class="stat-value">{{ formatFileSize(modelFile?.size) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Format</span>
                <span class="stat-value">{{ getFileFormat(modelFile?.name) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Uploaded</span>
                <span class="stat-value">Just now</span>
              </div>
            </div>
          </div>
          <div class="model-details-grid">
            <div class="detail-card">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h4>Geometry</h4>
              <div class="detail-stats">
                <div class="detail-stat">
                  <span>Vertices</span>
                  <strong>12,458</strong>
                </div>
                <div class="detail-stat">
                  <span>Faces</span>
                  <strong>24,916</strong>
                </div>
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </div>
              <h4>Materials</h4>
              <div class="detail-stats">
                <div class="detail-stat">
                  <span>Textures</span>
                  <strong>4</strong>
                </div>
                <div class="detail-stat">
                  <span>Materials</span>
                  <strong>3</strong>
                </div>
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4>Animations</h4>
              <div class="detail-stats">
                <div class="detail-stat">
                  <span>Bones</span>
                  <strong>82</strong>
                </div>
                <div class="detail-stat">
                  <span>Clips</span>
                  <strong>6</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="model-edit-sidebar" style="flex: 1;">
        <h2 class="edit-header">Model Details</h2>
        <form @submit.prevent="handleSubmit" class="edit-form">
          <div class="form-section basic-info">
            <h3 class="section-title">Basic Information</h3>
            <div class="form-group" style="max-width: 500px;">
              <label for="name" class="form-label">Name</label>
              <input
                v-model="formData.name"
                type="text"
                id="name"
                class="form-input"
                required
                placeholder="Enter model name"
              />
            </div>

            <div class="form-group" style="max-width: 500px;">
              <label for="description" class="form-label">Description</label>
              <textarea
                v-model="formData.description"
                id="description"
                class="form-textarea"
                placeholder="Describe your model..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="form-section categories-tags">
            <h3 class="section-title">Categories & Tags</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="category" class="form-label">Category</label>
                <select
                  v-model="formData.category"
                  id="category"
                  class="form-select"
                  required
                >
                  <option value="" disabled>Select category</option>
                  <option 
                    v-for="category in categories" 
                    :key="category" 
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Access</label>
                <button
                  @click.prevent="formData.publicAccess = !formData.publicAccess"
                  class="access-toggle"
                  :class="{ 'public': formData.publicAccess }"
                >
                  {{ formData.publicAccess ? 'Public' : 'Private' }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Tags</label>
              <div class="tags-input">
                <div class="tags-container">
                  <span
                    v-for="tag in formData.tags"
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                    <button
                      @click.prevent="removeTag(tag)"
                      class="tag-remove"
                    >×</button>
                  </span>
                </div>
                <div class="tag-input-container">
                  <input
                    v-model="newTag"
                    @keydown.enter.prevent="addTag"
                    type="text"
                    placeholder="Add tag..."
                    class="tag-input"
                  />
                  <button 
                    @click.prevent="addTag"
                    class="add-tag-btn"
                  >
                    Add
                  </button>
                </div>
                <div class="suggested-tags">
                  <button
                    v-for="tag in suggestedTags"
                    :key="tag"
                    @click.prevent="addSuggestedTag(tag)"
                    class="suggested-tag"
                  >{{ tag }}</button>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useModelStore } from '../../stores/modelStore';
import { useRouter } from 'vue-router';
import ThirdDScene from '../../components/3d-scene/3d-scene.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import axios from 'axios';
import { UserAuthService } from '../../service/auth/user.auth.service';

const user = JSON.parse(UserAuthService.getUser() || '{}');

const modelStore = useModelStore();
const router = useRouter();
const isSubmitting = ref(false);

// Get model file from store
const modelFile = computed(() => modelStore.getModel());

// Get asset files from store
const assetFiles = computed(() => modelStore.getAssetFiles());

// Get owner ID and nickname
const ownerId = ref('');
const ownerNickname = ref('');

// Set owner ID and nickname from user object
ownerId.value = user?.id || '';
ownerNickname.value = user?.username || '';

// Get categories from GraphQL
const { result } = useQuery(gql`
  query GetCategories {
    Category {
      getCategories
    }
  }
`);

const categories = computed(() => result.value?.Category.getCategories || []);

// Redirect if no model is uploaded and log files info
onMounted(() => {
  if (!modelFile.value) {
    router.push('/upload-asset');
  }
});

const formData = ref({
  name: '',
  description: '',
  category: '',
  tags: [] as string[],
  publicAccess: false,
  allowComments: true,
  allowTextureInspection: true,
  ageRestricted: false
});

const newTag = ref('');
const suggestedTags = [
  'animated', 'rigged', 'game-ready', 'low-poly', 'high-poly',
  'pbr', 'textured', 'sci-fi', 'fantasy', 'realistic'
];

function formatFileSize(bytes: number | undefined): string {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function getFileFormat(filename: string | undefined): string {
  if (!filename) return 'Unknown';
  return filename.split('.').pop()?.toUpperCase() || 'Unknown';
}

async function handleSubmit() {
  try {
    isSubmitting.value = true;
    
    const formDataToSend = new FormData();
    
    // Add model and asset files
    if (modelFile.value) {
      formDataToSend.append('files', modelFile.value);
    }
    
    assetFiles.value.forEach(file => {
      formDataToSend.append('files', file);
    });

    // Add form data
    const assetData = {
      ...formData.value,
      fileName: modelFile.value?.name,
      originalName: modelFile.value?.name,
      mimeType: modelFile.value?.type,
      size: modelFile.value?.size,
      ownerId: ownerId.value,
      ownerNickname: ownerNickname.value
    };

    formDataToSend.append('name', assetData.name);
    formDataToSend.append('description', assetData.description);
    formDataToSend.append('category', assetData.category);
    formDataToSend.append('tags', JSON.stringify(assetData.tags));
    formDataToSend.append('publicAccess', String(assetData.publicAccess));
    formDataToSend.append('username', assetData.ownerNickname);

    console.log(formDataToSend);

    const response = await axios.post('http://localhost:4000/assets-storage/create-asset', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.success) {
      router.push('/assets');
    }

  } catch (error) {
    console.error('Error uploading asset:', error);
  } finally {
    isSubmitting.value = false;
  }
}

function addTag() {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
    formData.value.tags.push(newTag.value.trim());
    newTag.value = '';
  }
}

function addSuggestedTag(tag: string) {
  if (!formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag);
  }
}

function removeTag(tag: string) {
  formData.value.tags = formData.value.tags.filter((t) => t !== tag);
}
</script>

<style src="./upload-info-asset.css" scoped></style>