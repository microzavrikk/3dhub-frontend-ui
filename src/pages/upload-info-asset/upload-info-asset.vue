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

          <div class="form-section advanced-settings">
            <h3 class="section-title">Advanced Settings</h3>
            <div class="settings-grid">
              <div class="setting-item">
                <label class="setting-label">
                  <input type="checkbox" v-model="formData.allowComments"/>
                  Allow Comments
                </label>
              </div>
              <div class="setting-item">
                <label class="setting-label">
                  <input type="checkbox" v-model="formData.allowTextureInspection"/>
                  Allow Texture Inspection
                </label>
              </div>
              <div class="setting-item">
                <label class="setting-label">
                  <input type="checkbox" v-model="formData.ageRestricted"/>
                  Age Restricted Content
                </label>
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

<style scoped>
.model-edit-container {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
}

.content-wrapper {
  display: grid;
  grid-template-columns: minmax(800px, 2fr) minmax(500px, 1fr);
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.model-preview-section {
  padding: 0;
  background: #141414;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.preview-header-bar {
  background: #1a1a1a;
  padding: 1rem 2rem;
  border-radius: 20px 20px 0 0;
  border-bottom: 2px solid #2a2a2a;
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
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #242424;
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: #2a2a2a;
  border-color: #4CAF50;
}

.preview-container {
  padding: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preview-header {
  font-size: 18px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
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
  gap: 1rem;
  margin-top: 1rem;
}

.detail-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.detail-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  background: #242424;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-icon svg {
  stroke: #4CAF50;
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
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.upload-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid #4CAF50;
  border-radius: 8px;
  color: #4CAF50;
}

.status-icon {
  display: flex;
  align-items: center;
}

.status-icon svg {
  stroke: #4CAF50;
}

.model-edit-sidebar {
  background: #141414;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  height: fit-content;
}

.form-section {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 16px;
  color: #fff;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #2a2a2a;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #ccc;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  background: #242424;
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 1px #4CAF50;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.access-toggle {
  width: 100%;
  padding: 0.75rem;
  background: #242424;
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.access-toggle.public {
  background: #4CAF50;
  border-color: #4CAF50;
}

.tags-input {
  background: #242424;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.75rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  min-height: 32px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.75rem;
  background: #4CAF50;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
}

.tag-remove {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0 0 0 0.25rem;
  font-size: 16px;
  line-height: 1;
}

.tag-input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tag-input {
  flex: 1;
  padding: 0.5rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
}

.add-tag-btn {
  padding: 0.5rem 1rem;
  background: #4CAF50;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-tag-btn:hover {
  background: #45a049;
}

.suggested-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.suggested-tag {
  padding: 0.35rem 0.75rem;
  background: #333;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.suggested-tag:hover {
  background: #4CAF50;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.setting-item {
  background: #242424;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #333;
}

.setting-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.setting-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #4CAF50;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #4CAF50;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background: #45a049;
}

.submit-btn:disabled {
  background: #333;
  cursor: not-allowed;
}
</style>
