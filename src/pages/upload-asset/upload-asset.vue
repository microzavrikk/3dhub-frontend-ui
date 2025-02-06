<template>
  <div class="upload-container">
    <h2>Upload your 3D creation</h2>
    <p class="upload-subtitle">Supported formats: GLTF, GLB, OBJ with textures</p>

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
          accept=".gltf,.glb,.obj,.bin,.png,.jpg,.jpeg"
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
              <span class="format-tag">GLB</span>
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
      assetFiles: [], // Added assetFiles array
      acceptedModelTypes: ['.gltf', '.glb', '.obj'],
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
        
        if (extension === '.bin') {
          console.log('Original uploaded bin file size:', file.size);
        }
        
        // Check if file is main model
        if (this.acceptedModelTypes.includes(extension)) {
          this.modelFile = file;
          this.modelStore.setModel(file);
        }
        
        // Check if file is valid asset
        if (this.acceptedModelTypes.includes(extension) || 
            this.acceptedAssetTypes.includes(extension)) {
          if (!this.selectedFiles.find(f => f.name === file.name)) {
            this.selectedFiles.push(file);
            
            // If not main model file, add as asset
            if (!this.acceptedModelTypes.includes(extension)) {
              this.assetFiles.push(file); // Add to assetFiles array
              console.log("file123123 [processFiles]", file);
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
      
      // If removing main model file
      if (this.acceptedModelTypes.includes(extension) && file === this.modelFile) {
        this.modelFile = null;
        this.modelStore.clearModel();
      } 
      // If removing asset file
      else if (this.acceptedAssetTypes.includes(extension)) {
        this.assetFiles = this.assetFiles.filter(f => f !== file); // Remove from assetFiles
        this.modelStore.removeAssetFile(file);
      }
    },

    handleCancel() {
      this.selectedFiles = [];
      this.modelFile = null;
      this.assetFiles = []; // Clear assetFiles
      this.modelStore.clearModel();
      this.$emit('cancel');
    },

    handleUpload() {
      if (!this.modelFile) {
        alert('Please select a 3D model file (.gltf, .glb or .obj)');
        return;
      }
      console.log("store", this.modelStore);
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

<style src="./upload-asset.css" scoped></style>