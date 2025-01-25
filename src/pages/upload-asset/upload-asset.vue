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
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  padding: 3rem;
  overflow: hidden;
}

.upload-subtitle {
  text-align: center;
  color: #94a3b8;
  margin-bottom: 2rem;
}

h2 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(45deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.drop-zone {
  flex: 1;
  border: 2px dashed #475569;
  border-radius: 16px;
  padding: 2rem;
  background: rgba(30, 41, 59, 0.5);
  transition: all 0.3s ease;
  max-width: 800px;
  margin: 0 auto;
}

.drop-zone:hover {
  border-color: #38bdf8;
  background: rgba(30, 41, 59, 0.8);
}

.drop-zone--active {
  border-color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
}

.drop-zone__empty {
  padding: 3rem;
  text-align: center;
}

.upload-icon-wrapper {
  background: rgba(56, 189, 248, 0.1);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.upload-icon {
  color: #38bdf8;
}

.drop-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #f8fafc;
}

.drop-subtitle {
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.supported-formats {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.format-tag {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.files-preview {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  overflow: hidden;
}

.files-preview__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(30, 41, 59, 0.8);
}

.files-count {
  color: #94a3b8;
  font-size: 0.9rem;
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
  padding: 0.75rem;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.selected-file--primary {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.file-icon {
  color: #38bdf8;
}

.file-details {
  display: flex;
  flex-direction: column;
}

.file-name {
  color: #f8fafc;
  font-weight: 500;
}

.file-size {
  color: #94a3b8;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.action-btn.upload {
  background: linear-gradient(45deg, #38bdf8, #818cf8);
  color: white;
  border: none;
}

.action-btn.cancel {
  background: transparent;
  border: 1px solid #475569;
  color: #94a3b8;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.2);
}

.action-btn.cancel:hover {
  border-color: #94a3b8;
  color: #f8fafc;
}

.file-input {
  display: none;
}
</style>