<template>
  <div class="model-edit-container">
    <div class="content-wrapper">
      <div class="model-preview-section">
        <div class="preview-header-bar">
          <h2 class="preview-header">Model Preview</h2>
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
            <ThirdDScene :model-file="modelFile || undefined"/>
          </div>
          <div class="preview-info">
            <div v-if="modelFile" class="upload-status">
              <div class="status-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>Model Uploaded</span>
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

      <div class="model-edit-sidebar">
        <h2 class="edit-header">Model Details</h2>
        <form @submit.prevent="handleSubmit" class="edit-form">
          <div class="form-section basic-info">
            <h3 class="section-title">Basic Information</h3>
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input
                v-model="formData.name"
                type="text"
                id="name"
                class="form-input"
                required
                placeholder="Enter model name"
                style="max-width: 510px"
              />
            </div>

            <div class="form-group">
              <label for="description" class="form-label">Description</label>
              <textarea
                v-model="formData.description"
                id="description"
                class="form-textarea"
                placeholder="Describe your model..."
                rows="3"
                style="max-width: 510px; height: 70px;"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="price" class="form-label">Price ($)</label>
              <input
                v-model="formData.price"
                type="number"
                id="price"
                class="form-input"
                required
                min="0"
                step="0.01"
                placeholder="Enter price in USD"
                style="max-width: 510px"
              />
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
  ageRestricted: false,
  price: 0
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
    formDataToSend.append('price', String(assetData.price));

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


<style>
.model-edit-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%),
              radial-gradient(circle at top right, rgba(76, 175, 80, 0.1) 0%, transparent 60%),
              radial-gradient(circle at bottom left, rgba(76, 175, 80, 0.05) 0%, transparent 40%);
  background-blend-mode: normal, screen, normal;
  color: #fff;
  font-family: 'Inter', sans-serif;
  padding: 2rem;
}

.content-wrapper {
  display: grid;
  grid-template-columns: minmax(700px, 1.5fr) minmax(600px, 1fr);
  gap: 2.5rem;
  max-width: 1800px;
  margin: 0 auto;
}

.model-preview-section {
  padding: 0;
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.preview-header-bar {
  background: rgba(26, 26, 26, 0.8);
  padding: 1.25rem 2rem;
  border-radius: 24px 24px 0 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-controls {
  display: flex;
  gap: 1rem;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(36, 36, 36, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.control-btn:hover {
  background: rgba(76, 175, 80, 0.2);
  border-color: #4CAF50;
  transform: translateY(-1px);
}

.control-btn svg {
  transition: all 0.2s ease;
}

.control-btn:hover svg {
  stroke: #4CAF50;
}

.preview-container {
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.preview-header {
  font-size: 1.25rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  margin: 0;
}

.preview-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.model-stats {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: flex-end;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.model-details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.detail-card {
  background: rgba(26, 26, 26, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.75rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.detail-card:hover {
  transform: translateY(-3px);
  background: rgba(26, 26, 26, 0.7);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.detail-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1.25rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.detail-card:hover .detail-icon {
  background: rgba(76, 175, 80, 0.2);
  transform: scale(1.1);
}

.detail-icon svg {
  stroke: #4CAF50;
  transition: all 0.3s ease;
}

.detail-card:hover .detail-icon svg {
  transform: scale(1.1);
}

.detail-card h4 {
  margin: 0 0 1rem;
  color: #fff;
  font-size: 16px;
}

.detail-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.detail-stat {
  text-align: center;
}

.detail-stat span {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 0.25rem;
}

.detail-stat strong {
  color: #4CAF50;
  font-size: 14px;
}

.edit-header {
  font-size: 24px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #2a2a2a;
}

.model-preview {
  width: 100%;
  height: 600px;
  background: rgba(26, 26, 26, 0.5);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.model-preview:hover {
  transform: scale(1.002);
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(76, 175, 80, 0.2);
}

.upload-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  color: #4CAF50;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.status-icon {
  display: flex;
  align-items: center;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.model-edit-sidebar {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
  transition: all 0.3s ease;
  animation: slideIn 0.6s ease-out;
}

.model-edit-sidebar:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}

.form-section {
  background: rgba(26, 26, 26, 0.5);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(76, 175, 80, 0.1);
}

.section-title {
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(76, 175, 80, 0.3);
  letter-spacing: 1px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 24px;
  background: linear-gradient(to bottom, #4CAF50, #2E7D32);
  border-radius: 2px;
}

.form-group {
  margin-bottom: 2rem;
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
}

.form-group:nth-child(2) { animation-delay: 0.1s; }
.form-group:nth-child(3) { animation-delay: 0.2s; }
.form-group:nth-child(4) { animation-delay: 0.3s; }

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-label {
  display: block;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: rgba(36, 36, 36, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  line-height: 1.6;
}

.form-input:hover,
.form-textarea:hover,
.form-select:hover {
  background: rgba(36, 36, 36, 0.9);
  border-color: rgba(76, 175, 80, 0.3);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  background: rgba(36, 36, 36, 1);
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2),
              0 0 20px rgba(76, 175, 80, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.access-toggle {
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(36, 36, 36, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 500;
}

.access-toggle::before {
  content: '';
  width: 20px;
  height: 20px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23fff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'/%3E%3C/svg%3E") center/contain no-repeat;
  transition: all 0.3s ease;
}

.access-toggle.public::before {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234CAF50'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'/%3E%3C/svg%3E") center/contain no-repeat;
}

.access-toggle:hover {
  background: rgba(76, 175, 80, 0.1);
  border-color: rgba(76, 175, 80, 0.3);
}

.access-toggle.public {
  background: rgba(76, 175, 80, 0.2);
  border-color: #4CAF50;
  color: #4CAF50;
}

.tags-input {
  background: rgba(36, 36, 36, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
  min-height: 32px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  font-size: 0.9rem;
  color: #4CAF50;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(76, 175, 80, 0.3);
  transform: translateY(-1px);
}

.tag-remove {
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
  line-height: 1;
  opacity: 0.8;
  transition: all 0.2s ease;
}

.tag-remove:hover {
  opacity: 1;
  transform: scale(1.1);
}

.tag-input-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tag-input {
  flex: 1;
  padding: 1rem 1.25rem;
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.tag-input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.add-tag-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  color: #4CAF50;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-tag-btn:hover {
  background: rgba(76, 175, 80, 0.3);
  transform: translateY(-1px);
}

.suggested-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.suggested-tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggested-tag:hover {
  background: rgba(76, 175, 80, 0.2);
  border-color: rgba(76, 175, 80, 0.3);
  color: #4CAF50;
  transform: translateY(-1px);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.setting-item {
  background: rgba(36, 36, 36, 0.8);
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.setting-item:hover {
  background: rgba(36, 36, 36, 0.9);
  border-color: rgba(76, 175, 80, 0.3);
  transform: translateY(-1px);
}

.setting-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
}

.setting-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #4CAF50;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  margin-top: 2rem;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #388E3C 0%, #2E7D32 100%);
  box-shadow: 0 6px 25px rgba(76, 175, 80, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Добавляем анимации */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.model-preview-section,
.model-edit-sidebar {
  animation: fadeIn 0.6s ease-out;
}

.detail-card {
  animation: fadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.detail-card:nth-child(1) { animation-delay: 0.1s; }
.detail-card:nth-child(2) { animation-delay: 0.2s; }
.detail-card:nth-child(3) { animation-delay: 0.3s; }

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>