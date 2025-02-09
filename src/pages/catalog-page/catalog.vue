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
              placeholder="Search amazing 3D models..."
              class="search-input"
            >
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
        </div>

        <div class="filter-group">
          <h3>Price Range</h3>
          <div class="price-inputs">
            <div class="price-input-wrapper">
              <input
                type="number"
                v-model.number="priceRange.min"
                :placeholder="filterStore.priceRange.min.toString()"
                class="price-input"
                @input="validatePriceRange"
              >
              <span class="currency">$</span>
            </div>
            <span class="price-separator">—</span>
            <div class="price-input-wrapper">
              <input
                type="number"
                v-model.number="priceRange.max"
                :placeholder="filterStore.priceRange.max.toString()"
                class="price-input"
                @input="validatePriceRange"
              >
              <span class="currency">$</span>
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
              >
              <span class="checkbox-label">{{ category }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h3>Popular Tags</h3>
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
              class="filter-option format-option"
            >
              <input 
                type="checkbox" 
                v-model="selectedFormats" 
                :value="format"
                class="custom-checkbox"
              >
              <span class="format-label">{{ format }}</span>
            </label>
          </div>
        </div>

        <button class="clear-filters" @click="clearFilters">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
          Reset All Filters
        </button>
      </div>

      <div class="models-section">
        <div class="section-header">
          <h2>Explore 3D Models</h2>
          <div class="sort-controls">
            <select v-model="sortBy" class="sort-select">
              <option value="newest">Latest Uploads</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div class="models-grid">
          <div v-if="loading" class="loading">
            <div class="loader"></div>
            <span>Discovering amazing 3D models...</span>
          </div>
          <div v-else-if="filteredModels.length === 0" class="no-results">
            <svg width="80" height="80" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <p>No models match your search criteria</p>
            <button class="reset-search" @click="clearFilters">
              <span>Try Different Filters</span>
            </button>
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
                <div class="preview-overlay">
                  <button class="preview-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    Preview
                  </button>
                </div>
              </div>
              <div class="model-info">
                <div class="model-header">
                  <h3>{{ model.name }}</h3>
                  <p class="model-author">by {{ model.author }}</p>
                </div>
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
                    <span class="price-label">{{ model.price === 0 ? 'Free' : `$${model.price}` }}</span>
                  </div>
                  <button class="download-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24">
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
import { ref, computed, onMounted, watch } from 'vue';
import { useFilterStore } from '../../stores/filterStore';
import Header from '../../components/header/header.vue';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';
import { useQuery } from '@vue/apollo-composable';
import { GetDefaultFiltersDocument, CategoryFilter } from '../../types';

// Store
const filterStore = useFilterStore();

// Reactive variables
const searchQuery = ref('');
const loading = ref(false);
const sortBy = ref('newest');
const selectedCategories = ref<string[]>([]);
const selectedTags = ref<string[]>([]);
const selectedFormats = ref<string[]>([]);
const priceRange = ref({
  min: 0,
  max: 1000
});

// Mock data (replace with real data later)
const formats = ['GLTF', 'GLB', 'FBX', 'OBJ'];
const popularTags = ['Character', 'Vehicle', 'Architecture', 'Nature', 'Animal', 'Furniture'];

// Add this interface near the top of the script section
interface Model {
  id: string;
  name: string;
  author: string;
  file: File;
  tags: string[];
  price: number;
}

// Query
const { result, loading: queryLoading, error } = useQuery(GetDefaultFiltersDocument);

// Watch for query results
watch(result, (newResult) => {
  if (newResult) {
    console.log('Query result:', newResult);
  }
});

// Watch for query errors
watch(error, (newError) => {
  if (newError) {
    console.error('Query error:', newError);
  }
});

// Computed properties
const filteredCategories = computed(() => {
  if (!result.value) return [];
  return result.value.getDefaultFilters.categories.map((cat: CategoryFilter) => cat.name);
});

const filteredModels = computed(() => {
  return [] as Model[]; // Now properly typed as Model array
});

// Methods
const validatePriceRange = () => {
  if (priceRange.value.min < 0) priceRange.value.min = 0;
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
  selectedCategories.value = [];
  selectedTags.value = [];
  selectedFormats.value = [];
  priceRange.value = {
    min: 0,
    max: 1000
  };
  sortBy.value = 'newest';
};

const viewModel = (model: Model) => {
  // Add your view model logic here
  console.log('Viewing model:', model);
};

// Log initial query execution
onMounted(() => {
  console.log('Query is executing...');
});
</script>

<style scoped>
.catalog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.catalog-container {
  padding: 32px;
  margin-top: 80px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
}

.search-section {
  margin-bottom: 32px;
}

.search-bar {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.search-bar:hover,
.search-bar:focus-within {
  background: rgba(255, 255, 255, 0.08);
  border-color: #4CAF50;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.2);
}

.search-input {
  background: none;
  border: none;
  color: #fff;
  font-size: 15px;
  width: 100%;
  padding-right: 32px;
  outline: none;
  font-weight: 500;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.search-icon {
  position: absolute;
  right: 16px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.search-bar:focus-within .search-icon {
  color: #4CAF50;
}

.filters-section {
  background: rgba(26, 26, 30, 0.8);
  border-radius: 24px;
  padding: 28px;
  height: fit-content;
  position: sticky;
  top: 100px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.filter-group {
  margin-bottom: 32px;
}

.filter-group h3 {
  font-size: 1.1rem;
  color: #4CAF50;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.price-input-wrapper {
  position: relative;
  flex: 1;
}

.price-input {
  width: 100%;
  padding: 14px;
  padding-left: 28px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.currency {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.price-input:hover,
.price-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.price-separator {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  font-size: 16px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.filter-option:hover {
  background: rgba(76, 175, 80, 0.1);
  transform: translateX(5px);
}

.checkbox-label {
  color: #e0e0e0;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.2s ease;
}

.custom-checkbox {
  appearance: none;
  width: 22px;
  height: 22px;
  border: 2px solid rgba(76, 175, 80, 0.5);
  border-radius: 8px;
  background: rgba(26, 26, 26, 0.95);
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  gap: 10px;
}

.tag {
  padding: 10px 16px;
  background: rgba(51, 51, 51, 0.8);
  border-radius: 14px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #fff;
  border: 1px solid rgba(76, 175, 80, 0.3);
  font-weight: 500;
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
  padding: 16px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.clear-filters:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: rgba(26, 26, 30, 0.8);
  padding: 24px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header h2 {
  font-size: 2rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: 1px;
}

.sort-select {
  padding: 12px 20px;
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 14px;
  background: rgba(26, 26, 26, 0.95);
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
}

.sort-select:hover {
  border-color: #4CAF50;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.2);
}

.models-grid {
  min-height: 500px;
}

.model-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
}

.model-card {
  background: rgba(26, 26, 30, 0.8);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(76, 175, 80, 0.2);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
}

.model-card:hover {
  transform: translateY(-12px);
  border-color: #4CAF50;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.model-preview {
  height: 300px;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.model-card:hover .preview-overlay {
  opacity: 1;
}

.preview-btn {
  padding: 12px 24px;
  background: rgba(76, 175, 80, 0.9);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.preview-btn:hover {
  background: #4CAF50;
  transform: scale(1.05);
}

.model-info {
  padding: 24px;
  background: linear-gradient(180deg, rgba(26, 26, 30, 0.95) 0%, rgba(26, 26, 30, 0.98) 100%);
}

.model-header {
  margin-bottom: 16px;
}

.model-info h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 8px;
}

.model-author {
  color: #4CAF50;
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
}

.model-tags {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  flex-wrap: wrap;
}

.model-tag {
  padding: 6px 12px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 10px;
  font-size: 13px;
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.3);
  font-weight: 500;
}

.model-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.model-price {
  font-weight: 700;
  color: #4CAF50;
  font-size: 1.4rem;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 15px;
}

.download-btn:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.loading,
.no-results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  color: #4CAF50;
  gap: 20px;
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
  padding: 16px 32px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.reset-search:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .catalog-container {
    grid-template-columns: 280px 1fr;
    gap: 24px;
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .catalog-container {
    grid-template-columns: 1fr;
  }
  
  .filters-section {
    position: static;
  }
}
</style>