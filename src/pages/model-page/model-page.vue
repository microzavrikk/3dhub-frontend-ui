<template>
  <div class="model-page">
    <div class="model-container">
      <div class="model-viewer-container">
        <AsyncModelLoader />
      </div>
      <div class="model-info">
        <h1 class="model-title">{{ modelData[0]?.name }}</h1>
        <p class="model-description">{{ modelData[0]?.description }}</p>
        <div class="model-metadata">
          <div class="metadata-item">
            <span class="label">Category:</span>
            <span class="value">{{ modelData[0]?.category }}</span>
          </div>
          <div class="metadata-item">
            <span class="label">Price:</span>
            <span class="value">${{ modelData[0]?.price }}</span>
          </div>
          <div class="metadata-item">
            <span class="label">Creator:</span>
            <span class="value">{{ modelData[0]?.ownerId }}</span>
          </div>
        </div>
        <button class="download-btn">Download Model</button>
      </div>
      <div class="comments-section">
        <h2>Comments</h2>
        <div class="comment-form">
          <textarea v-model="newComment" placeholder="Leave a comment..."></textarea>
          <button @click="submitComment">Submit</button>
        </div>
        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <p class="comment-author">{{ comment.author }}</p>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <h2>Proposed Models</h2>
      <div class="proposed-models">
        <div v-for="model in proposedModels" :key="model.id" class="proposed-model">
          <img :src="model.thumbnail" alt="Model Thumbnail" />
          <p>{{ model.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { defineComponent, h } from 'vue';
import gql from 'graphql-tag';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';
import { useModelStore } from '../../stores/modelStore';

const route = useRoute();
const modelStore = useModelStore();
const titleName = computed(() => route.query.titleName as string);

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
  {
    titleName: titleName
  }
);

const modelData = computed(() => result.value?.AssetsQuery.getFileByTitleName || []);

const loadModelFiles = async (modelFiles: any[]) => {
  if (!modelStore) return null;

  try {
    const gltfFile = modelFiles.find(file => file.file[0].endsWith('.gltf'));
    const binFile = modelFiles.find(file => file.file[0].endsWith('.bin'));

    if (!gltfFile || !binFile) {
      console.error('Missing required model files');
      return null;
    }

    const gltfResponse = await fetch(gltfFile.awsLocation);
    const gltfBlob = await gltfResponse.blob();
    const gltfModelFile = new File([gltfBlob], gltfFile.file[0].split('/').pop() || 'model.gltf', { 
      type: 'model/gltf+json'
    });

    const binResponse = await fetch(binFile.awsLocation);
    const binBlob = await binResponse.blob();
    const binModelFile = new File([binBlob], binFile.file[0].split('/').pop() || 'model.bin', {
      type: 'application/octet-stream'
    });

    await modelStore.setModel(gltfModelFile);
    await modelStore.addAssetFile(binModelFile);

    return gltfModelFile;
  } catch (error) {
    console.error('Failed to load model files:', error);
    return null;
  }
};

const AsyncModelLoader = defineComponent({
  setup() {
    const modelFile = ref<File | null>(null);

    const loadModel = async () => {
      if (modelData.value?.length) {
        modelFile.value = await loadModelFiles(modelData.value);
      }
    };

    loadModel();

    return () => modelFile.value ? h(ThreeDScene, { 
      modelFile: modelFile.value,
      width: '100%',
      height: '600px',
      class: 'model-viewer'
    }) : h('div', { class: 'loading' }, 'Loading model...');
  }
});

const comments = ref([
  { id: 1, author: 'User1', text: 'Great model!' },
  { id: 2, author: 'User2', text: 'Amazing work!' }
]);

const newComment = ref('');

const submitComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({
      id: comments.value.length + 1,
      author: 'CurrentUser',
      text: newComment.value.trim()
    });
    newComment.value = '';
  }
};

const proposedModels = ref([
  { id: 1, name: 'Model 1', thumbnail: 'path/to/thumbnail1.jpg' },
  { id: 2, name: 'Model 2', thumbnail: 'path/to/thumbnail2.jpg' },
  { id: 3, name: 'Model 3', thumbnail: 'path/to/thumbnail3.jpg' }
]);
</script>

<style scoped>
.model-page {
  display: flex;
  min-height: 100vh;
  background: #f0f4f8;
  color: #333;
  padding: 40px;
}

.model-container {
  flex: 3;
  margin-right: 20px;
}

.model-viewer-container {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.model-viewer {
  width: 100%;
  height: 600px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.model-info {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.model-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.model-description {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
}

.model-metadata {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.metadata-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 14px;
  color: #888;
}

.value {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.download-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.download-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.comments-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.comments-section h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.comment-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.comment-form button {
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.comment-form button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
}

.comment-author {
  font-weight: 600;
  margin-bottom: 5px;
}

.comment-text {
  font-size: 14px;
  color: #333;
}

.sidebar {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.proposed-models {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.proposed-model {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.proposed-model img {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.proposed-model p {
  font-size: 14px;
  color: #333;
  text-align: center;
}
</style>