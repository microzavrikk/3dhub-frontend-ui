<template>
  <div class="catalog-container">
    <div class="filters-section">
      <div class="search-bar">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search models..."
          class="search-input"
        >
      </div>

      <div class="filters">
        <div class="filter-group">
          <h3>Price Range</h3>
          <div class="price-filters">
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="free"
              > Free
            </label>
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="under5"
              > Under $5
            </label>
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="5to10"
              > $5 - $10
            </label>
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="10to20"
              > $10 - $20
            </label>
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="above20"
              > Above $20
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h3>Categories</h3>
          <div class="category-filters">
            <label 
              v-for="category in categories" 
              :key="category"
              class="filter-option"
            >
              <input 
                type="checkbox" 
                v-model="selectedCategories" 
                :value="category"
              > {{ category }}
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h3>Tags</h3>
          <div class="tags-container">
            <span 
              v-for="tag in popularTags" 
              :key="tag"
              class="tag"
              :class="{ active: selectedTags.includes(tag) }"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="filter-group">
          <h3>File Format</h3>
          <div class="format-filters">
            <label 
              v-for="format in formats" 
              :key="format"
              class="filter-option"
            >
              <input 
                type="checkbox" 
                v-model="selectedFormats" 
                :value="format"
              > {{ format }}
            </label>
          </div>
        </div>

        <button class="clear-filters" @click="clearFilters">
          Clear All Filters
        </button>
      </div>
    </div>

    <div class="models-grid">
      <div v-if="loading" class="loading">
        Loading models...
      </div>
      <div v-else-if="filteredModels.length === 0" class="no-results">
        No models found matching your criteria
      </div>
      <div 
        v-else 
        class="model-cards"
      >
        <div 
          v-for="model in filteredModels" 
          :key="model.id" 
          class="model-card"
        >
          <div class="model-preview">
            <Suspense>
              <template #default>
                <ThreeDScene :model-file="model.file" />
              </template>
              <template #fallback>
                <div class="loading-placeholder">Loading model...</div>
              </template>
            </Suspense>
          </div>
          <div class="model-info">
            <h3>{{ model.name }}</h3>
            <p class="model-author">by {{ model.author }}</p>
            <div class="model-tags">
              <span 
                v-for="tag in model.tags.slice(0, 3)" 
                :key="tag" 
                class="model-tag"
              >
                {{ tag }}
              </span>
            </div>
            <div class="model-price">
              {{ model.price === 0 ? 'Free' : `$${model.price}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ThreeDScene from '../3d-scene/3d-scene.vue';

// State
const searchQuery = ref('');
const priceFilter = ref('all');
const selectedCategories = ref<string[]>([]);
const selectedTags = ref<string[]>([]);
const selectedFormats = ref<string[]>([]);
const loading = ref(true);
const models = ref<any[]>([]);

// Constants
const categories = [
  'Characters',
  'Architecture',
  'Vehicles',
  'Nature',
  'Furniture',
  'Animals',
  'Sci-fi',
  'Weapons'
];

const formats = ['GLTF', 'GLB', 'FBX', 'OBJ'];

const popularTags = [
  'Low-poly',
  'Realistic',
  'Animated',
  'PBR',
  'Game-ready',
  'Rigged',
  'Textured',
  'Modular'
];

// Methods
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

const clearFilters = () => {
  searchQuery.value = '';
  priceFilter.value = 'all';
  selectedCategories.value = [];
  selectedTags.value = [];
  selectedFormats.value = [];
};

// Computed
const filteredModels = computed(() => {
  return models.value.filter(model => {
    // Search query filter
    if (searchQuery.value && !model.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false;
    }

    // Price filter
    if (priceFilter.value !== 'all') {
      switch (priceFilter.value) {
        case 'free':
          if (model.price !== 0) return false;
          break;
        case 'under5':
          if (model.price >= 5) return false;
          break;
        case '5to10':
          if (model.price < 5 || model.price > 10) return false;
          break;
        case '10to20':
          if (model.price < 10 || model.price > 20) return false;
          break;
        case 'above20':
          if (model.price <= 20) return false;
          break;
      }
    }

    // Categories filter
    if (selectedCategories.value.length > 0 && !selectedCategories.value.includes(model.category)) {
      return false;
    }

    // Tags filter
    if (selectedTags.value.length > 0 && !selectedTags.value.some(tag => model.tags.includes(tag))) {
      return false;
    }

    // Format filter
    if (selectedFormats.value.length > 0 && !selectedFormats.value.includes(model.format)) {
      return false;
    }

    return true;
  });
});

// Lifecycle
onMounted(async () => {
  try {
    // Здесь будет запрос к API для получения моделей
    const response = await fetch('http://localhost:4000/models');
    models.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch models:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.catalog-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.filters-section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  margin-bottom: 1.5rem;
}

.search-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-group {
  margin-bottom: 2rem;
}

.filter-group h3 {
  font-size: 1.1rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: #475569;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.tag:hover {
  background: #e2e8f0;
}

.tag.active {
  background: #3b82f6;
  color: white;
}

.clear-filters {
  width: 100%;
  padding: 0.75rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-filters:hover {
  background: #dc2626;
}

.models-grid {
  min-height: 500px;
}

.model-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.model-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.model-card:hover {
  transform: translateY(-4px);
}

.model-preview {
  height: 250px;
  background: #f8fafc;
}

.model-info {
  padding: 1.5rem;
}

.model-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #0f172a;
}

.model-author {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.model-tags {
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.model-tag {
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #475569;
}

.model-price {
  font-weight: 600;
  color: #0f172a;
  font-size: 1.1rem;
}

.loading,
.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #64748b;
  font-size: 1.1rem;
}

.loading-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  color: #64748b;
}
</style> 