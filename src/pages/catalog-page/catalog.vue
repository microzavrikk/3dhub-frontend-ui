<template>
  <div class="catalog-page">
    <header class="header">
      <div class="search-section">
        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search models..."
            class="search-input"
          >
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>
    </header>

    <div class="catalog-container">
      <div class="filters-section">
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

      <div class="models-section">
        <div class="section-header">
          <h2>3D Models</h2>
          <div class="sort-controls">
            <select v-model="sortBy" class="sort-select">
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div class="models-grid">
          <div v-if="loading" class="loading">
            <div class="loader"></div>
            <span>Loading amazing 3D models...</span>
          </div>
          <div v-else-if="filteredModels.length === 0" class="no-results">
            <svg width="64" height="64" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <p>No models found matching your criteria</p>
            <button class="reset-search" @click="clearFilters">Reset Filters</button>
          </div>
          <div 
            v-else 
            class="model-cards"
          >
            <div 
              v-for="model in filteredModels" 
              :key="model.id" 
              class="model-card"
              @click="viewModel(model)"
            >
              <div class="model-preview">
                <Suspense>
                  <template #default>
                    <ThreeDScene :model-file="model.file" />
                  </template>
                  <template #fallback>
                    <div class="loading-placeholder">
                      <div class="loader"></div>
                    </div>
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
                <div class="model-footer">
                  <div class="model-price">
                    {{ model.price === 0 ? 'Free' : `$${model.price}` }}
                  </div>
                  <button class="download-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';

// State
const searchQuery = ref('');
const priceFilter = ref('all');
const selectedCategories = ref<string[]>([]);
const selectedTags = ref<string[]>([]);
const selectedFormats = ref<string[]>([]);
const loading = ref(true);
const models = ref<any[]>([]);
const sortBy = ref('newest');

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

const viewModel = (model: any) => {
  // Implement view model logic
  console.log('Viewing model:', model);
};

// Computed
const filteredModels = computed(() => {
  return models.value.filter(model => {
    if (searchQuery.value && !model.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false;
    }
    // ... rest of filtering logic
    return true;
  });
});

// Lifecycle
onMounted(async () => {
  try {
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
.catalog-page {
  min-height: 100vh;
  background: #FFFFFF;
}

.header {
  background: #FFFFFF;
  border-bottom: 1px solid #F0F0F0;
  padding: 1.25rem 2.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-section {
  max-width: 900px;
  margin: 0 auto;
}

.search-bar {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 1.2rem 3.5rem 1.2rem 1.8rem;
  border: 2px solid #F0F0F0;
  border-radius: 16px;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  background: #FFFFFF;
  color: #333333;
}

.search-input:focus {
  outline: none;
  border-color: #666666;
  box-shadow: 0 0 0 4px rgba(102, 102, 102, 0.1);
}

.search-icon {
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
}

.catalog-container {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2.5rem;
  max-width: 1800px;
  margin: 0 auto;
  padding: 2.5rem;
}

.filters-section {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: fit-content;
  border: 1px solid #F0F0F0;
}

.filter-group {
  margin-bottom: 2.5rem;
}

.filter-group h3 {
  font-size: 1.2rem;
  color: #333333;
  margin-bottom: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  color: #666666;
  transition: color 0.2s ease;
  font-size: 1rem;
}

.filter-option:hover {
  color: #333333;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tag {
  padding: 0.6rem 1.2rem;
  background: #FAFAFA;
  border-radius: 24px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666666;
  border: 1px solid #F0F0F0;
}

.tag:hover {
  background: #F0F0F0;
  color: #333333;
  border-color: #666666;
}

.tag.active {
  background: #666666;
  color: white;
  border-color: #666666;
}

.clear-filters {
  width: 100%;
  padding: 1rem;
  background: #999999;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 1rem;
}

.clear-filters:hover {
  background: #666666;
  transform: translateY(-1px);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  font-size: 1.8rem;
  color: #333333;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.sort-select {
  padding: 0.8rem 1.5rem;
  border: 1px solid #F0F0F0;
  border-radius: 12px;
  background: #FFFFFF;
  color: #666666;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.sort-select:hover {
  border-color: #666666;
}

.models-grid {
  min-height: 500px;
}

.model-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.model-card {
  background: #FFFFFF;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
  border: 1px solid #F0F0F0;
  cursor: pointer;
}

.model-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  border-color: #666666;
}

.model-preview {
  height: 280px;
  background: #FAFAFA;
}

.model-info {
  padding: 1.8rem;
}

.model-info h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #333333;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.model-author {
  color: #666666;
  font-size: 1rem;
  margin: 0.8rem 0;
}

.model-tags {
  display: flex;
  gap: 0.8rem;
  margin: 0.8rem 0;
}

.model-tag {
  padding: 0.4rem 1rem;
  background: #FAFAFA;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #666666;
  border: 1px solid #F0F0F0;
}

.model-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.model-price {
  font-weight: 600;
  color: #333333;
  font-size: 1.2rem;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  background: #666666;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 1rem;
}

.download-btn:hover {
  background: #333333;
  transform: translateY(-1px);
}

.loading,
.no-results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #666666;
  gap: 1.2rem;
}

.loader {
  width: 48px;
  height: 48px;
  border: 3px solid #F0F0F0;
  border-top-color: #666666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.reset-search {
  padding: 0.8rem 1.5rem;
  background: #666666;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.reset-search:hover {
  background: #333333;
  transform: translateY(-1px);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>