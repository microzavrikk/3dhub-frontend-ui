<template>
  <div class="catalog-page">
    <Header />
    
    <div class="catalog-container">
      <div class="filters-section">
        <div class="search-section">
          <div class="search-bar">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search models..."
              class="search-input"
            >
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
        </div>

        <div class="filter-group">
          <h3>Price Range</h3>
          <div class="price-inputs" style="padding-left: -100px;">
            <div class="price-input-wrapper">
              <input
                type="number"
                v-model.number="priceRange.min"
                :placeholder="filterStore.priceRange.min"
                class="price-input"
                @input="validatePriceRange"
              >
            </div>
            <span class="price-separator">-</span>
            <div class="price-input-wrapper">
              <input
                type="number"
                v-model.number="priceRange.max"
                :placeholder="filterStore.priceRange.max"
                class="price-input"
                @input="validatePriceRange"
              >
            </div>
          </div>
        </div>

        <div class="filter-group">
          <h3>Categories</h3>
          <div class="category-filters">
            <label 
              v-for="category in filteredCategories" 
              :key="category"
              class="filter-option"
            >
              <input 
                type="checkbox" 
                v-model="selectedCategories" 
                :value="category"
                class="custom-checkbox"
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
                class="custom-checkbox"
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
import { useQuery } from '@vue/apollo-composable';
import { useFilterStore } from '../../stores/filterStore';

import { GetDefaultFiltersQuery, GetDefaultFiltersDocument } from '../../types';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';
import Header from '../../components/header/header.vue';

// Stores
const filterStore = useFilterStore();

// State
const searchQuery = ref('');
const priceRange = ref({
  min: 0,
  max: 1000
});
const selectedCategories = ref<string[]>([]);
const selectedTags = ref<string[]>([]);
const selectedFormats = ref<string[]>([]);
const loading = ref(true);
const models = ref<any[]>([]); // Initialize as empty array
const sortBy = ref('newest');

const formats = ['GLTF', 'GLB', 'FBX', 'OBJ'];

const { result } = useQuery(GetDefaultFiltersDocument);

// Methods
const validatePriceRange = () => {
  if (priceRange.value.min > priceRange.value.max) {
    priceRange.value.min = priceRange.value.max;
  }
  if (priceRange.value.max < priceRange.value.min) {
    priceRange.value.max = priceRange.value.min;
  }
};

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
  priceRange.value = {
    min: filterStore.priceRange.min,
    max: filterStore.priceRange.max
  };
  selectedCategories.value = [];
  selectedTags.value = [];
  selectedFormats.value = [];
};

const viewModel = (model: any) => {
  // Implement view model logic
  console.log('Viewing model:', model);
};

// Computed
const filteredCategories = computed(() => {
  return filterStore.categories.filter(category => /^[A-Z]/.test(category));
});

const popularTags = computed(() => [
  'Character', 
  'Environment',
  'Vehicle',
  'Furniture',
  'Animal',
  'Plant',
  'Weapon',
  'Food',
  'Architecture',
  'Sci-fi'
]);

const filteredModels = computed(() => {
  if (!Array.isArray(models.value)) {
    return [];
  }
  
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
    const data = await response.json();
    models.value = Array.isArray(data) ? data : [];

    if (result.value) {
      filterStore.setFilterParams(result.value);
      priceRange.value = {
        min: filterStore.priceRange.min,
        max: filterStore.priceRange.max
      };
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    models.value = []; // Set to empty array on error
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.catalog-page {
  min-height: 100vh;
  background: #121212;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.catalog-container {
  padding: 24px;
  margin-top: 80px; /* Отступ под хедер */
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
}

.search-section {
  margin-bottom: 24px;
}

.search-bar {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.search-bar:hover,
.search-bar:focus-within {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(76, 175, 80, 0.5);
}

.search-input {
  background: none;
  border: none;
  color: #fff;
  font-size: 14px;
  width: 100%;
  padding-right: 32px;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-icon {
  position: absolute;
  right: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.filters-section {
  background: #1a1a1e;
  border-radius: 12px;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-group {
  margin-bottom: 2.5rem;
}

.filter-group h3 {
  font-size: 1.2rem;
  color: #4CAF50;
  margin-bottom: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-inputs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-left: -14px;
  padding-right: -15px;
}

.price-input-wrapper {
  position: relative;
  flex: 1;
  max-width: 120px;
}

.price-input {
  width: 100%;
  padding: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.3px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  backdrop-filter: blur(4px);
  -moz-appearance: textfield;
}

.price-input::-webkit-outer-spin-button,
.price-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-input:hover,
.price-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.price-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.price-separator {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  font-size: 14px;
  margin: 0 2px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  color: #bbb;
  transition: color 0.2s ease;
  font-size: 1rem;
}

.filter-option:hover {
  color: #4CAF50;
  transform: translateX(5px);
  transition: all 0.3s ease;
}

/* Custom checkbox styles */
.custom-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(76, 175, 80, 0.5);
  border-radius: 6px;
  background: rgba(26, 26, 26, 0.95);
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.custom-checkbox:checked {
  background: #4CAF50;
  border-color: #4CAF50;
}

.custom-checkbox:checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tag {
  padding: 0.6rem 1.2rem;
  background: rgba(51, 51, 51, 0.8);
  border-radius: 12px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.tag:hover {
  background: rgba(76, 175, 80, 0.2);
  border-color: #4CAF50;
  transform: translateY(-2px);
}

.tag.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.clear-filters {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.clear-filters:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  font-size: 2rem;
  color: #4CAF50;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.sort-select {
  padding: 0.8rem 1.5rem;
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  background: rgba(26, 26, 26, 0.95);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.sort-select:hover {
  border-color: #4CAF50;
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.2);
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
  background: rgba(26, 26, 26, 0.95);
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(76, 175, 80, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.model-card:hover {
  transform: translateY(-8px);
  border-color: #4CAF50;
  box-shadow: 0 12px 40px rgba(76, 175, 80, 0.2);
}

.model-preview {
  height: 280px;
  background: #222;
  position: relative;
  overflow: hidden;
}

.model-info {
  padding: 1.8rem;
  background: linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.98) 100%);
}

.model-info h3 {
  margin: 0;
  font-size: 1.4rem;
  color: #fff;
  font-weight: 600;
}

.model-author {
  color: #4CAF50;
  font-size: 1rem;
  margin: 0.8rem 0;
  font-weight: 500;
}

.model-tags {
  display: flex;
  gap: 0.8rem;
  margin: 0.8rem 0;
}

.model-tag {
  padding: 0.4rem 1rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.model-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.model-price {
  font-weight: 700;
  color: #4CAF50;
  font-size: 1.3rem;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.download-btn:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.loading,
.no-results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #4CAF50;
  gap: 1.2rem;
}

.loader {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(76, 175, 80, 0.3);
  border-top-color: #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.reset-search {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.reset-search:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>