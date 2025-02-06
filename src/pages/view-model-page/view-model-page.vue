<template>
  <div class="model-view-container">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      Loading model...
    </div>
    <div v-else-if="error" class="error-state">
      Failed to load model: {{ error.message }}
    </div>
    <div v-else-if="!modelStore.model" class="error-state">
      No model file available
    </div>
    <div v-else class="content-wrapper">
      <div class="model-preview-section">
        <div class="preview-header-bar">
          <h2 class="preview-header">{{ modelData?.name || 'Loading...' }}</h2>
          <div class="preview-controls">
            <button class="control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              Fullscreen
            </button>
          </div>
        </div>
        
        <div class="preview-container">
          <ThirdDScene :model-file="modelStore.model || undefined"/>
          <div class="preview-overlay">
            <div class="model-quick-info">
              <div class="quick-info-item">
                <span class="info-icon">📁</span>
                <div>
                  <div class="info-label">Format</div>
                  <div class="info-value">{{ getFileFormat(modelStore.model?.name) }}</div>
                </div>
              </div>
              <div class="quick-info-item">
                <span class="info-icon">💾</span>
                <div>
                  <div class="info-label">Size</div>
                  <div class="info-value">{{ formatFileSize(modelStore.model?.size) }}</div>
                </div>
              </div>
              <div class="quick-info-item">
                <span class="info-icon">🏷️</span>
                <div>
                  <div class="info-label">Category</div>
                  <div class="info-value">{{ modelData?.category || 'N/A' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="model-info-panel">
        <div class="info-tabs">
          <div class="tab active">Details</div>
          <div class="tab">Properties</div>
          <div class="tab">History</div>
        </div>

        <div class="info-content">
          <div class="info-section">
            <div class="info-header">
              <h3>Description</h3>
              <span class="price-tag">${{ modelData?.price }}</span>
            </div>
            <p class="model-description">{{ modelData?.description || 'No description provided' }}</p>
          </div>

          <div class="info-section tags-section">
            <h3>Tags</h3>
            <div class="tags-container">
              <span v-for="tag in modelTags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="info-section author-section">
            <h3>Author</h3>
            <div class="author-card">
              <div class="author-avatar">
                {{ modelData?.ownerId?.charAt(0).toUpperCase() }}
              </div>
              <div class="author-details">
                <div class="author-name">{{ modelData?.ownerId }}</div>
                <div class="author-date">Created {{ formatDate(modelData?.createdAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useModelStore } from '../../stores/modelStore';
import ThirdDScene from '../../components/3d-scene/3d-scene.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import axios from 'axios';

export default defineComponent({
  name: 'ViewModelPage',
  components: {
    ThirdDScene
  },
  setup() {
    const route = useRoute();
    const modelStore = useModelStore();
    const modelData = ref<any>(null);

    const modelName = computed(() => {
      const paramName = route.params['model-name'] as string;
      if (paramName) return paramName;
      
      const queryName = route.query['titleName'] as string;
      return queryName || 'test_view';
    });

    console.log('Initial modelName:', modelName.value);

    const modelTags = computed(() => {
      if (!modelData.value?.tags) return [];
      try {
        const tags = modelData.value.tags[0];
        return typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch {
        return [];
      }
    });

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
      () => ({
        titleName: modelName.value
      }),
      {
        enabled: computed(() => !!modelName.value),
        fetchPolicy: 'network-only',
      }
    );

    const loadModelFiles = async (modelData: any[]) => {
      try {
        console.log('Loading model files:', modelData);

        const gltfFile = modelData.find(file => file.file[0].endsWith('.gltf'));
        const binFile = modelData.find(file => file.file[0].endsWith('.bin'));

        if (!gltfFile) {
          console.error('Missing required GLTF file');
          return;
        }

        await modelStore.clearModel();
        
        // Сначала загружаем бинарный файл
        if (binFile) {
          const binResponse = await fetch(binFile.awsLocation);
          console.log('binResponse', binResponse);
          const binaryBuffer = await binResponse.arrayBuffer();
          console.log('Raw binary buffer size:', binaryBuffer.byteLength);
          // Convert ArrayBuffer to Uint8Array to see actual bytes
          console.log('binResponse fields:', {
            ok: binResponse.ok,
            status: binResponse.status, 
            statusText: binResponse.statusText,
            headers: Object.fromEntries(binResponse.headers),
            type: binResponse.type,
            url: binResponse.url,
            redirected: binResponse.redirected,
            bodyUsed: binResponse.bodyUsed,
            body: binResponse.body instanceof ReadableStream ? {
              locked: binResponse.body.locked,
              prototype: Object.getPrototypeOf(binResponse.body)
            } : null
          });
          
          // Создаем чистый ArrayBuffer без метаданных
          const cleanBuffer = binaryBuffer.slice(0);
          console.log('Clean buffer size:', cleanBuffer.byteLength);
          
          const binModelFile = new File([cleanBuffer], binFile.file[0].split('/').pop() || 'model.bin', {
            type: 'application/octet-stream; charset=utf-8'
          });
          
          console.log('Final bin file size:', binModelFile.size);
          await modelStore.addAssetFile(binModelFile);
          console.log("Successfully loaded bin file:", binModelFile);
        }

        // Затем загружаем GLTF файл
        const gltfResponse = await fetch(gltfFile.awsLocation);
        const gltfBlob = await gltfResponse.blob();
        const gltfModelFile = new File([gltfBlob], gltfFile.file[0].split('/').pop() || 'model.gltf', {
        });

        await modelStore.setModel(gltfModelFile);
        
        console.log("Final modelStore state:", {
          model: modelStore.model,
          assets: modelStore.getAssetFiles()
        });

      } catch (error) {
        console.error('Failed to load model file:', error);
      }
    };

    const formatDate = (dateString: string): string => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatFileSize = (size?: number): string => {
      if (!size) return 'Unknown';
      const kb = size / 1024;
      if (kb < 1024) {
        return `${kb.toFixed(2)} KB`;
      }
      const mb = kb / 1024;
      return `${mb.toFixed(2)} MB`;
    };

    const getFileFormat = (filename?: string): string => {
      if (!filename) return 'Unknown';
      const ext = filename.split('.').pop();
      return ext ? ext.toUpperCase() : 'Unknown';
    };

    watch(modelName, (newName) => {
      console.log('Model name changed:', newName);
      if (!newName) {
        modelStore.clearModel();
        modelData.value = null;
      }
    });

    watch(() => result.value, async (newResult) => {
      console.log('Query result changed:', newResult);
      if (newResult?.AssetsQuery.getFileByTitleName?.length > 0) {
        const files = newResult.AssetsQuery.getFileByTitleName;
        modelData.value = files[0];
        await loadModelFiles(files);
      } else {
        console.error('No model files found');
        await modelStore.clearModel();
        modelData.value = null;
      }
    }, { immediate: true });

    onUnmounted(async () => {
      await modelStore.clearModel();
    });

    return {
      modelStore,
      modelData,
      modelName,
      modelTags,
      loading,
      error,
      formatDate,
      formatFileSize,
      getFileFormat
    };
  }
});
</script>

<style scoped>
.model-view-container {
  height: 100vh;
  background: #0f0f13;
  color: #fff;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 1.5rem;
  overflow: hidden;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 1.5rem;
  height: calc(100vh - 3rem);
  max-width: 2000px;
  margin: 0 auto;
}

.model-preview-section {
  background: #1a1a20;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.preview-header-bar {
  padding: 1rem 1.5rem;
  background: #212128;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-header {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.preview-container {
  flex: 1;
  position: relative;
  min-height: 0;
}

.preview-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(26, 26, 32, 0.9));
}

.model-quick-info {
  display: flex;
  gap: 2rem;
}

.quick-info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.info-icon {
  font-size: 1.5rem;
}

.info-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.info-value {
  font-weight: 500;
}

.model-info-panel {
  background: #1a1a20;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.info-tabs {
  display: flex;
  padding: 0.5rem;
  background: #212128;
  gap: 0.5rem;
}

.tab {
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.tab.active {
  background: #2a2a32;
  font-weight: 500;
}

.info-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.info-section {
  background: #212128;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.price-tag {
  background: #4CAF50;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #2a2a32;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.author-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 48px;
  height: 48px;
  background: #4CAF50;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-date {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.control-btn {
  background: #2a2a32;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover {
  background: #35353f;
}

.loading-state,
.error-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(76, 175, 80, 0.3);
  border-top-color: #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 1rem;
}
</style>
