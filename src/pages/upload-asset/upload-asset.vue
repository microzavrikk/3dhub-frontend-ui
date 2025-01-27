<template>
  <div class="upload-container">
    <h2>Upload your 3D creation</h2>
    <p class="upload-subtitle">Supported formats: GLTF, OBJ with textures</p>

    <div class="upload-sections">
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
          accept=".gltf,.obj,.bin,.png,.jpg,.jpeg"
          multiple
        >

        <div class="drop-zone__content">
          <div v-if="selectedFiles.length" class="files-preview">
            <div class="files-preview__header">
              <h3>Selected Files</h3>
              <span class="files-count">{{ selectedFiles.length }} files</span>
            </div>
            <div class="selected-files">
              <div v-for="file in selectedFiles" :key="file.name" 
                   :class="['selected-file', { 'selected-file--primary': isMainModel(file) }]">
                <div class="file-info">
                  <span class="file-icon" v-html="getFileIcon(file)"></span>
                  <div class="file-details">
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-size">{{ formatFileSize(file.size) }}</span>
                  </div>
                </div>
                <button class="remove-btn" @click.stop="removeFile(file)" title="Remove file">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="drop-zone__empty">
            <div class="upload-icon-wrapper">
              <svg width="64" height="64" viewBox="0 0 24 24" class="upload-icon">
                <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
              </svg>
            </div>
            <h3 class="drop-title">Drag & drop your files here</h3>
            <p class="drop-subtitle">or click to browse</p>
            <div class="supported-formats">
              <span class="format-tag">GLTF</span>
              <span class="format-tag">OBJ</span>
              <span class="format-tag">Textures</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="action-btn cancel" @click="handleCancel">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Cancel
      </button>
      <button
        v-if="modelFile"
        class="action-btn upload"
        @click="handleUpload"
      >
        Continue
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { useModelStore } from '../../stores/modelStore';
import { useRouter } from 'vue-router';

export default {
  name: 'FileUploader',

  setup() {
    const modelStore = useModelStore();
    const router = useRouter();
    return { modelStore, router };
  },

  data() {
    return {
      isDragging: false,
      selectedFiles: [],
      modelFile: null,
      acceptedModelTypes: ['.gltf', '.obj'],
      acceptedAssetTypes: ['.bin', '.png', '.jpg', '.jpeg']
    };
  },

  methods: {
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    handleDragOver(e) {
      this.isDragging = true;
    },

    handleDragLeave(e) {
      this.isDragging = false;
    },

    handleDrop(e) {
      this.isDragging = false;
      const files = Array.from(e.dataTransfer.files);
      this.processFiles(files);
    },

    handleFileSelect(e) {
      const files = Array.from(e.target.files);
      this.processFiles(files);
    },

    processFiles(files) {
      files.forEach(file => {
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        
        // Проверяем, является ли файл основной моделью
        if (this.acceptedModelTypes.includes(extension)) {
          this.modelFile = file;
          this.modelStore.setModel(file);
        }
        
        // Проверяем, является ли файл допустимым ассетом
        if (this.acceptedModelTypes.includes(extension) || 
            this.acceptedAssetTypes.includes(extension)) {
          if (!this.selectedFiles.find(f => f.name === file.name)) {
            this.selectedFiles.push(file);
            
            // Если это не основной файл модели, добавляем его как ассет
            if (!this.acceptedModelTypes.includes(extension)) {
              this.modelStore.addAssetFile(file);
            }
          }
        } else {
          alert(`File ${file.name} has unsupported format`);
        }
      });
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    removeFile(file) {
      this.selectedFiles = this.selectedFiles.filter(f => f !== file);
      
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      
      // Если удаляем основной файл модели
      if (this.acceptedModelTypes.includes(extension) && file === this.modelFile) {
        this.modelFile = null;
        this.modelStore.clearModel();
      } 
      // Если удаляем ассет
      else if (this.acceptedAssetTypes.includes(extension)) {
        this.modelStore.removeAssetFile(file);
      }
    },

    handleCancel() {
      this.selectedFiles = [];
      this.modelFile = null;
      this.modelStore.clearModel();
      this.$emit('cancel');
    },

    handleUpload() {
      if (!this.modelFile) {
        alert('Please select a 3D model file (.gltf or .obj)');
        return;
      }
      this.router.push('/upload-info-asset');
    },

    isMainModel(file) {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return this.acceptedModelTypes.includes(extension);
    },

    getFileIcon(file) {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      if (this.acceptedModelTypes.includes(extension)) {
        return '<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>';
      } else if (this.acceptedAssetTypes.includes(extension)) {
        return '<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>';
      }
      return '';
    }
  }
};
</script>

<style scoped>
.upload-container {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  padding: 3rem;
}

h2 {
  font-size: 48px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  position: relative;
  text-align: center;
  margin-bottom: 2rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #66BB6A);
}

.upload-subtitle {
  text-align: center;
  color: #999;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.upload-sections {
  padding: 2rem;
  background: #111111;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  max-width: 800px;
  margin: 0 auto;
}

.drop-zone {
  border: 2px dashed #333;
  border-radius: 15px;
  padding: 2rem;
  background: #1a1a1a;
  transition: all 0.3s ease;
  cursor: pointer;
}

.drop-zone:hover {
  border-color: #4CAF50;
  transform: translateY(-2px);
}

.drop-zone--active {
  border-color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.drop-zone__empty {
  padding: 3rem;
  text-align: center;
}

.upload-icon-wrapper {
  background: rgba(76, 175, 80, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.upload-icon {
  color: #4CAF50;
}

.drop-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
}

.drop-subtitle {
  color: #999;
  margin-bottom: 1.5rem;
}

.format-tag {
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin: 0 0.25rem;
}

.files-preview {
  background: #1a1a1a;
  border-radius: 15px;
  border: 1px solid #333;
}

.files-preview__header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.files-count {
  color: #999;
}

.selected-files {
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
}

.selected-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #333;
  transition: all 0.3s ease;
}

.selected-file:hover {
  background: rgba(76, 175, 80, 0.1);
}

.selected-file--primary {
  background: rgba(76, 175, 80, 0.1);
  border-left: 3px solid #4CAF50;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.file-icon {
  color: #4CAF50;
}

.file-details {
  display: flex;
  flex-direction: column;
}

.file-name {
  color: #fff;
  font-weight: 500;
}

.file-size {
  color: #999;
  font-size: 0.9rem;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  color: #ff4d4d;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.action-btn.upload {
  background: #4CAF50;
  color: white;
  border: none;
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.2);
}

.action-btn.upload:hover {
  background: #66BB6A;
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(76, 175, 80, 0.3);
}

.action-btn.cancel {
  background: transparent;
  border: 1px solid #333;
  color: #999;
}

.action-btn.cancel:hover {
  border-color: #ff4d4d;
  color: #ff4d4d;
  transform: translateY(-2px);
}

.file-input {
  display: none;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4CAF50;
}
</style>