<template>
  <div class="model-edit-container">
    <div class="model-edit-sidebar">
      <h2 class="edit-header">Edit Model Details</h2>
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
          />
        </div>

        <!-- Description Editor -->
        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            v-model="formData.description"
            id="description"
            class="form-textarea"
          ></textarea>
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
            <input
              v-model="newTag"
              @keydown.enter.prevent="addTag"
              type="text"
              placeholder="Add tags..."
              class="tag-input"
            />
          </div>
        </div>

        <!-- Public Access Toggle -->
        <div class="form-group">
          <div class="toggle-item">
            <span>Public Access</span>
            <button
              @click.prevent="formData.publicAccess = !formData.publicAccess"
              class="toggle-switch"
              :class="{ 'active': formData.publicAccess }"
            >
              <span class="toggle-slider"></span>
            </button>
          </div>
        </div>

        <!-- Metadata Section -->
        <div class="form-group">
          <label for="metadata" class="form-label">Metadata (JSON)</label>
          <textarea
            v-model="metadataString"
            id="metadata"
            class="form-textarea"
            @input="updateMetadata"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn">Save Changes</button>
      </form>
    </div>

    <!-- 3D Scene Display Area -->
    <ThirdDScene/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useModelStore } from '../../stores/modelStore';
import ThirdDScene from '../../components/3d-scene/3d-scene.vue';

const modelStore = useModelStore();

const formData = ref({
  name: '',
  description: '',
  fileKey: '',
  bucketName: '',
  fileSize: 0,
  fileType: '',
  tags: [] as string[],
  ownerId: '', // This should be set from your auth system
  publicAccess: false,
  thumbnailUrl: '',
  metadata: null as any
});

const newTag = ref('');
const metadataString = ref('{}');

onMounted(() => {
  // Initialize metadata string if metadata exists
  if (formData.value.metadata) {
    metadataString.value = JSON.stringify(formData.value.metadata, null, 2);
  }
});

function updateMetadata() {
  try {
    formData.value.metadata = JSON.parse(metadataString.value);
  } catch (e) {
    console.error('Invalid JSON in metadata');
  }
}

function handleSubmit() {
  // Here you would call your GraphQL mutation
  const submitData = {
    ...formData.value,
    fileSize: Number(formData.value.fileSize)
  };
  console.log('Form submitted with data:', submitData);
}

function addTag() {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
    formData.value.tags.push(newTag.value.trim());
    newTag.value = '';
  }
}

function removeTag(tag: string) {
  formData.value.tags = formData.value.tags.filter((t) => t !== tag);
}
</script>

<style scoped>
.model-edit-container {
  display: flex;
  background-color: #1a1a1a;
  border-radius: 8px;
  width: calc(100% - 40px);
  margin: 20px;
}

.model-edit-sidebar {
  flex: 1;
  padding: 20px;
}

.edit-header {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
}

.edit-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  color: #a0aec0;
}

.form-input,
.form-select,
.editor-content {
  background-color: #333;
}

.editor-wrapper {
}

.editor-toolbar {
}

.toolbar-btn {
}

.editor-content {
}

.tags-input {
}

.tag-input {
}

.settings-section {
}

.submit-btn {
}
</style>
