<template>
  <div class="upload-container">
    <h2>Upload a new model</h2>
    
    <div
      class="drop-zone"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      :class="{ 'drop-zone--active': isDragging }"
      @click="triggerFileInput"
    >
      <input
        type="file"
        ref="fileInput"
        @change="handleFileSelect"
        class="file-input"
        :accept="acceptedFileTypes"
      >
      
      <div class="drop-zone__content">
        <div v-if="selectedFile">
          <div class="selected-file">
            <span>{{ selectedFile.name }}</span>
            <button class="remove-btn" @click.stop="removeFile">×</button>
          </div>
        </div>
        <div v-else>
          <p>Drag & drop or browse</p>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="cancel-btn" @click="handleCancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import { useModelStore } from '../../stores/modelStore';

export default {
  name: 'FileUploader',

  setup() {
    const modelStore = useModelStore();
    return { modelStore };
  },
  
  data() {
    return {
      isDragging: false,
      selectedFile: null,
      acceptedFileTypes: '*/*'
    }
  },

  methods: {
    handleDragOver(e) {
      this.isDragging = true
    },

    handleDragLeave(e) {
      this.isDragging = false
    },

    handleDrop(e) {
      this.isDragging = false;
      const files = e.dataTransfer.files;
      if (files.length) {
        this.handleFileUpload(files[0]);
      }
    },

    handleFileSelect(e) {
      const files = e.target.files;
      if (files.length) {
        this.handleFileUpload(files[0]);
      }
    },

    handleFileUpload(file) {
      this.selectedFile = file;
      this.modelStore.setModel(file);
      this.modelStore.logStoreState();
    },

    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    removeFile() {
      this.selectedFile = null;
      this.$refs.fileInput.value = '';
      this.modelStore.clearModel();
      this.modelStore.logStoreState();
    },

    handleCancel() {
      this.removeFile();
      this.$emit('cancel');
    },

    getSelectedFile() {
      return this.selectedFile;
    }
  },

  beforeUnmount() {
    if (this.selectedFile) {
      this.modelStore.clearModel();
    }
  }
}
</script>

<style scoped>
.upload-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background: #f8f8f8;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drop-zone:hover {
  background: #f0f0f0;
}

.drop-zone--active {
  border-color: #2196f3;
  background: #e3f2fd;
}

.file-input {
  display: none;
}

.selected-file {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  word-break: break-all;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff5252;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.cancel-btn {
  padding: 8px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}
</style>