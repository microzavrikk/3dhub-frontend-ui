<template>
  <div class="page-wrapper">
    <Header />
    <div class="model-page">
      <div class="model-container">
        <div class="model-viewer">
          <AsyncModelLoader />
        </div>
        <div class="model-info">
          <h1>{{ modelData[0]?.name }}</h1>
          <p>{{ modelData[0]?.description }}</p>
          
          <div class="metadata">
            <div class="metadata-item">
              <span>Category</span>
              <span class="highlight">{{ modelData[0]?.category }}</span>
            </div>
            <div class="metadata-item">
              <span>Price</span>
              <span class="price">${{ modelData[0]?.price }}</span>
            </div>
            <div class="metadata-item">
              <span>Creator</span>
              <div class="creator">
                <img :src="`http://localhost:4000/user-avatar/get-avatar/${modelData[0]?.ownerId}`" 
                     @click="fileInput?.click()">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileChange"
                  hidden
                />
                <router-link :to="`/profile/${modelData[0]?.ownerId}`">
                  {{ modelData[0]?.ownerId }}
                </router-link>
              </div>
            </div>
          </div>

          <button class="primary-btn">Download Model</button>
        </div>

        <div class="comments">
          <h2>Comments</h2>
          <div class="comment-form">
            <textarea v-model="newComment" placeholder="Share your thoughts..."></textarea>
            <button @click="submitComment">Post</button>
          </div>

          <div class="comments-list">
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <div class="comment-header">
                <div class="avatar">{{ comment.author.charAt(0) }}</div>
                <span>{{ comment.author }}</span>
              </div>
              <p>{{ comment.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <aside class="sidebar">
        <h2>Proposed Models</h2>
        <div class="proposed-list">
          <div v-for="model in groupedRandomModels" :key="model.titleName" class="proposed-item">
            <div class="preview">
              <AsyncProposedModelLoader :model-files="model.files" />
            </div>
            <span>{{ model.titleName }}</span>
            <span class="price">${{ model.price }}</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { defineComponent, h } from 'vue';
import gql from 'graphql-tag';
import axios from 'axios';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';
import { useModelStore } from '../../stores/modelStore';
import Header from '../../components/header/header.vue';
import { UserAuthService } from '../../service/auth/user.auth.service';

const route = useRoute();
const modelStore = useModelStore();
const titleName = computed(() => route.query.titleName as string);
const fileInput = ref<HTMLInputElement | null>(null);

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

const { result: randomModelsResult } = useQuery(
  gql`
    query GetRandomModels {
      AssetsQuery {
        getRandomAssets(count: 6) {
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
  `
);

const modelData = computed(() => result.value?.AssetsQuery.getFileByTitleName || []);

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const file = target.files[0];
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('username', modelData.value[0]?.ownerId);

  try {
    await axios.post('http://localhost:4000/user-avatar/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    console.error('Failed to upload avatar:', error);
  }
};

const groupedRandomModels = computed(() => {
  const models = new Map();
  
  const randomModels = randomModelsResult.value?.AssetsQuery.getRandomAssets || [];
  
  randomModels.forEach(asset => {
    if (!models.has(asset.titleName)) {
      models.set(asset.titleName, {
        titleName: asset.titleName,
        category: asset.category,
        price: asset.price,
        files: []
      });
    }
    models.get(asset.titleName).files.push(asset);
  });
  
  return Array.from(models.values());
});

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

    await Promise.all(
      modelFiles.map(async (file) => {
        if (!file.file[0].endsWith('.gltf') && !file.file[0].endsWith('.bin')) {
          const response = await fetch(file.awsLocation);
          const blob = await response.blob();
          const assetFile = new File([blob], file.file[0].split('/').pop() || 'asset', {
            type: 'image/*'
          });
          await modelStore.addAssetFile(assetFile);
        }
      })
    );

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

    watch(modelData, (newValue) => {
      if (newValue?.length) {
        loadModel();
      }
    }, { immediate: true });

    onMounted(() => {
      if (modelData.value?.length) {
        loadModel();
      }
    });

    return () => {
      if (loading.value) {
        return h('div', { class: 'loading' }, 'Loading...');
      }
      if (error.value) {
        return h('div', { class: 'error' }, `Error: ${error.value.message}`);
      }
      if (!modelFile.value) {
        return h('div', { class: 'loading' }, 'Loading model...');
      }
      return h(ThreeDScene, { 
        modelFile: modelFile.value,
        width: '100%',
        height: '500px'
      });
    };
  }
});

const AsyncProposedModelLoader = defineComponent({
  props: {
    modelFiles: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const modelFile = ref<File | null>(null);

    const loadProposedModel = async () => {
      modelFile.value = await loadModelFiles(props.modelFiles);
    };

    onMounted(() => {
      loadProposedModel();
    });

    return () => {
      if (!modelFile.value) {
        return h('div', { class: 'loading' }, 'Loading...');
      }
      return h(ThreeDScene, {
        modelFile: modelFile.value,
        width: '100%',
        height: '200px'
      });
    };
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

onMounted(() => {
  console.log(UserAuthService.getUser());
});

</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: #0f0f0f;
}

.model-page {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  color: #fff;
}

.model-container {
  flex: 3;
}

.model-viewer {
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.model-info {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.model-info h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.model-info p {
  color: #aaa;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.metadata {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.metadata-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #222;
  border-radius: 6px;
}

.highlight {
  color: #4CAF50;
}

.price {
  color: #4CAF50;
  font-weight: 600;
}

.creator {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.creator img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.creator a {
  color: #4CAF50;
  text-decoration: none;
}

.primary-btn {
  width: 100%;
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.primary-btn:hover {
  background: #45a049;
}

.comments {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
}

.comments h2 {
  margin-bottom: 1.5rem;
}

.comment-form {
  margin-bottom: 2rem;
}

.comment-form textarea {
  width: 100%;
  padding: 1rem;
  background: #222;
  border: none;
  border-radius: 6px;
  color: #fff;
  margin-bottom: 1rem;
  resize: vertical;
}

.comment-form button {
  padding: 0.5rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment {
  background: #222;
  padding: 1rem;
  border-radius: 6px;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.avatar {
  width: 32px;
  height: 32px;
  background: #4CAF50;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 600;
}

.sidebar {
  flex: 1;
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
}

.proposed-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.proposed-item {
  background: #222;
  padding: 1rem;
  border-radius: 6px;
  transition: 0.2s;
}

.proposed-item:hover {
  transform: translateY(-2px);
}

.preview {
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.8rem;
}

.loading {
  padding: 1rem;
  text-align: center;
  color: #aaa;
}

.error {
  padding: 1rem;
  text-align: center;
  color: #ff4444;
}
</style>