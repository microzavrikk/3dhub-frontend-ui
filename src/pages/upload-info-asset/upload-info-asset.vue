<template>
  <div class="model-edit-container">
    <div class="content-wrapper">
      <!-- 3D Scene Display Area -->
      <div class="model-preview-section">
        <h2 class="preview-header">Model Preview</h2>
        <div class="model-preview">
          <ThirdDScene :model-file="modelFile"/>
        </div>
      </div>

      <div class="model-edit-sidebar">
        <h2 class="edit-header">Model Details</h2>
        <form @submit.prevent="handleSubmit" class="edit-form">
          <!-- Name Input -->
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

          <!-- Description Editor -->
          <div class="form-group">
            <label for="description" class="form-label">Description (Optional)</label>
            <textarea
              v-model="formData.description"
              id="description"
              class="form-textarea"
              placeholder="Describe your model..."
              rows="4"
            ></textarea>
          </div>

          <!-- Category Dropdown -->
          <div class="form-group">
            <label for="category" class="form-label">Category</label>
            <select
              v-model="formData.category"
              id="category"
              class="form-input"
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

          <!-- Tags Section -->
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
              <div class="tag-input-wrapper">
                <input
                  v-model="newTag"
                  @keydown.enter.prevent="addTag"
                  type="text"
                  placeholder="Type and press Enter..."
                  class="tag-input"
                />
                <button 
                  @click.prevent="addTag"
                  class="tag-add-btn"
                >Add</button>
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

          <!-- Additional Options -->
          <div class="form-group options-group">
            <div class="toggle-item">
            </div>
            <div class="toggle-item">
              <span class="toggle-label">Public Access</span>
              <button
                @click.prevent="formData.publicAccess = !formData.publicAccess"
                class="toggle-switch"
                :class="{ 'active': formData.publicAccess }"
              >
                <span class="toggle-slider"></span>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span class="btn-icon">💾</span>
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
      router.push('/assets'); // Redirect to assets page after successful upload
    }

  } catch (error) {
    console.error('Error uploading asset:', error);
    // Handle error (show error message to user)
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.model-edit-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  padding: 2rem;
  position: relative;
  z-index: 1;
  max-width: 1600px;
  margin: 0 auto;
  height: calc(100vh - 4rem);
}

.model-preview-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-header {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.model-preview {
  flex: 1;
  background: rgba(36, 36, 48, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  min-height: 300px;
}

.model-edit-sidebar {
  background: rgba(36, 36, 48, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  height: 100%;
}

.edit-header {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: #a0aec0;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-input,
.form-textarea {
  background: rgba(51, 51, 51, 0.6);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  outline: none;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  background: rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 0.25rem 0.75rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tag-remove {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
  line-height: 1;
}

.tag-input-wrapper {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag-input {
  flex: 1;
  background: rgba(51, 51, 51, 0.6);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 0.5rem;
  color: #ffffff;
  font-size: 0.9rem;
}

.tag-add-btn {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
}

.tag-add-btn:hover {
  background: rgba(59, 130, 246, 0.3);
}

.suggested-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.suggested-tag {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
}

.suggested-tag:hover {
  background: rgba(59, 130, 246, 0.2);
}

.options-group {
  background: rgba(51, 51, 51, 0.3);
  border-radius: 8px;
  padding: 1rem;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.toggle-label {
  font-weight: 500;
}

.toggle-switch {
  width: 50px;
  height: 26px;
  background: rgba(51, 51, 51, 0.6);
  border-radius: 13px;
  position: relative;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-switch.active {
  background: #3b82f6;
}

.toggle-slider {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: all 0.3s;
}

.toggle-switch.active .toggle-slider {
  transform: translateX(24px);
}

.submit-btn {
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.2rem;
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .model-preview {
    min-height: 400px;
  }
}
</style>
