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
                class="custom-radio"
              > Free
            </label>
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="under5"
                class="custom-radio"
              > Under $5
            </label>
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="5to10"
                class="custom-radio"
              > $5 - $10
            </label>
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="10to20"
                class="custom-radio"
              > $10 - $20
            </label>
            <label class="filter-option">
              <input 
                type="radio" 
                v-model="priceFilter" 
                value="above20"
                class="custom-radio"
              > Above $20
            </label>
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
const categories = ref<string[]>([]);

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

// Add this interface near the top of the script section
interface CategoryResponse {
  data: {
    Category: {
      getCategories: string[];
      getAllCategoryInS3: string[];
    }
  }
}

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
const filteredCategories = computed(() => {
  return categories.value.filter(category => /^[A-Z]/.test(category));
});

const filteredModels = computed(() => {
  return models.value.filter(model => {
    if (searchQuery.value && !model.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false;
    }
    // ... rest of filtering logic
    return true;
  });
});

// Update the fetchCategories function
const fetchCategories = async () => {
  try {
    const query = `
      query {
        Category {
          getCategories
          getAllCategoryInS3
        }
      }
    `;

    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json() as CategoryResponse;
    categories.value = [...new Set([
      ...(data.data.Category.getCategories || []),
      ...(data.data.Category.getAllCategoryInS3 || [])
    ])];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

// Lifecycle
onMounted(async () => {
  try {
    await Promise.all([
      fetchCategories(),
      fetch('http://localhost:4000/models')
        .then(res => res.json())
        .then((data) => {
          models.value = data as any[];
        })
    ]);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.catalog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.header {
  background: rgba(40, 40, 40, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1.25rem 2.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
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
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: rgba(40, 40, 40, 0.7);
  color: #fff;
}

.search-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.2);
}

.search-icon {
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #4CAF50;
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
  background: rgba(26, 26, 26, 0.95);
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid rgba(76, 175, 80, 0.2);
  height: fit-content;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
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

/* Custom radio styles */
.custom-radio {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(76, 175, 80, 0.5);
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.95);
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.custom-radio:checked {
  border-color: #4CAF50;
}

.custom-radio:checked::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: #4CAF50;
  border-radius: 50%;
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