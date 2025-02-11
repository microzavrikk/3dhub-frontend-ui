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

        <div class="find-button-container">
          <button 
            class="find-button" 
            @click="executeSearch"
            :disabled="assetsLoading"
          >
            <svg 
              v-if="!assetsLoading" 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/>
            </svg>
            <span class="loader" v-else></span>
            {{ assetsLoading ? 'Searching...' : 'Find Models' }}
          </button>
        </div>
      </div>

      <div class="models-section">
        <div class="section-header">
          <h2>Explore 3D Models</h2>
          <div class="sort-controls">
            <select v-model="sortBy" class="sort-select">
              <option value="date_desc">Latest Uploads</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="date_asc">Oldest First</option>
            </select>
          </div>
        </div>

        <div class="models-grid">
          <div v-if="loading" class="loading">
            <div class="loader"></div>
            <span>Discovering amazing 3D models...</span>
          </div>
          <div v-else-if="groupedModels.length === 0" class="no-results">
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
              v-for="model in groupedModels" 
              :key="model.titleName" 
              class="model-card"
              @click="viewModel(model)"
            >
              <div class="model-preview">
                <Suspense>
                  <template #default>
                    <AsyncModelLoader :model="model" />
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
                  <p class="model-author">by {{ model.ownerId }}</p>
                </div>
                <div class="model-tags">
                  <span 
                    v-for="tag in model.tags" 
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
import { useModelStore } from '../../stores/modelStore';
import Header from '../../components/header/header.vue';
import ThreeDScene from '../../components/3d-scene/3d-scene.vue';
import { useQuery } from '@vue/apollo-composable';
import { GetDefaultFiltersDocument, CategoryFilter, FindAssetsByFilterDocument, type AssetOutput } from '../../types';
import { defineComponent, h } from 'vue';
import axios from 'axios';

// Stores
const filterStore = useFilterStore();
const modelStore = useModelStore();

// Reactive variables
const searchQuery = ref('');
const loading = ref(false);
const sortBy = ref('date_desc');
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

// Query for default filters
const { result: defaultFiltersResult, loading: queryLoading, error: defaultFiltersError } = useQuery(GetDefaultFiltersDocument);

// Query for filtered assets
const { result: assetsResult, loading: assetsLoading, error: assetsError } = useQuery(
  FindAssetsByFilterDocument,
  computed(() => ({
    input: {
      assetName: searchQuery.value,
      categories: selectedCategories.value.map(name => ({ name })),
      formats: selectedFormats.value.map(format => ({ format })),
      tags: selectedTags.value,
      priceRange: priceRange.value,
      sortBy: sortBy.value
    }
  }))
);

// Watch for assets query results
watch(assetsResult, (newResult) => {
  if (newResult) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Assets query completed. Results:`, newResult.findAssetsByFilter);
  }
});

// Watch for assets query errors
watch(assetsError, (newError) => {
  if (newError) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Assets query error:`, newError);
  }
});

// Computed properties
const filteredCategories = computed(() => {
  if (!defaultFiltersResult.value) return [];
  return defaultFiltersResult.value.getDefaultFilters.categories.map((cat: CategoryFilter) => cat.name);
});

const groupedModels = computed(() => {
  if (!assetsResult.value) return [];
  
  const models = new Map();
  
  assetsResult.value.findAssetsByFilter.assets.forEach((asset: any) => {
    if (!models.has(asset.titleName)) {
      models.set(asset.titleName, {
        titleName: asset.titleName,
        name: asset.name,
        category: asset.category,
        description: asset.description,
        price: asset.price,
        ownerId: asset.ownerId,
        tags: asset.tags,
        files: []
      });
    }
    models.get(asset.titleName).files.push({
      name: asset.file[0],
      downloadUrl: asset.awsLocation
    });
  });
  
  return Array.from(models.values());
});

const loadModelFiles = async (model: any) => {
  console.log("model123123", model);
  if (!modelStore) return null;

  try {
    // Clear previous model data
    modelStore.clearModel();
    
    // Filter files for current model only
    const modelFiles = model.files.filter((file: any) => {
      const pathParts = file.name.split('/');
      const modelName = pathParts[pathParts.length - 2]; // Get model folder name
      return modelName === model.titleName;
    });

    console.log("modelFiles123", modelFiles);

    // Find .gltf and .bin files
    const gltfFile = modelFiles.find((file: any) => file.name.endsWith('.gltf'));
    const binFile = modelFiles.find((file: any) => file.name.endsWith('.bin'));

    console.log("modelFiles", modelFiles);
    console.log("gltfFile", gltfFile);
    console.log("binFile", binFile);

    if (!gltfFile || !binFile) {
      console.error('Missing required model files');
      return null;
    }

    console.log("FileName-modelFiles ", gltfFile);
    console.log("FileName-modelFiles", binFile);

    console.log("FileName-modelFiles", gltfFile.name);
    console.log("FileName-modelFiles", binFile.name);

    console.log("assets file before: ", modelStore.getAssetFiles());

    // Load .gltf file
    const gltfResponse = await fetch(gltfFile.downloadUrl);
    const gltfBlob = await gltfResponse.blob();
    const gltfModelFile = new File([gltfBlob], gltfFile.name.split('/').pop() || gltfFile.name, {
    });

    // Load .bin file
    const binResponse = await fetch(binFile.downloadUrl);
    const binBlob = await binResponse.blob();
    const binModelFile = new File([binBlob], binFile.name.split('/').pop() || binFile.name, {
      type: 'application/octet-stream'
    });

    // Set main .gltf file
    await modelStore.setModel(gltfModelFile);
    
    console.log("bin model file added: ", binModelFile, "iteration: ", modelFiles.length, "timestamp: ", new Date().toISOString());

    // Add .bin file as asset
    console.log("Added FileName-modelFiles", binModelFile);
    await modelStore.addAssetFile(binModelFile);

    console.log("assets file after: ", modelStore.getAssetFiles(), "iteration: ", modelFiles.length, "timestamp: ", new Date().toISOString());

    console.log("Added FileName-modelFiles", modelStore.getAssetFiles());

    // Load remaining asset files (textures etc)
    await Promise.all(
      modelFiles.map(async (file: any) => {
        if (file.name !== gltfFile.name && file.name !== binFile.name) {
          const response = await fetch(file.downloadUrl);
          const blob = await response.blob();
          const assetFile = new File([blob], file.name, { 
            type: 'image/*'
          });
          console.log("assetFile Promise.all", assetFile);
          await modelStore.addAssetFile(assetFile);
        }
      })
    );

    console.log("Model store cleared, current assets:", modelStore.getAssetFiles());

    return gltfModelFile;
  } catch (error) {
    console.error('Failed to load model files:', error);
    return null;
  }
};

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
  sortBy.value = 'date_desc';
};

const viewModel = (model: any) => {
  console.log('Viewing model:', model);
};

const executeSearch = () => {
  const filters = {
    assetName: searchQuery.value,
    categories: selectedCategories.value.map(name => ({
      id: name,
      name: name,
      count: 0
    })),
    formats: selectedFormats.value.map(format => ({
      format: format,
      count: 0
    })),
    tags: selectedTags.value,
    priceRange: priceRange.value,
    sortOptions: [{ 
      value: sortBy.value,
      label: sortBy.value
    }],
    totalCount: 0
  };
  filterStore.setDefaultFilters(filters);
};

const AsyncModelLoader = defineComponent({
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  async setup(props) {
    const modelFile = await loadModelFiles(props.model);
    if (!modelFile) {
      return () => h('div', 'Failed to load model');
    }

    console.log("modelFile123 setup", modelFile);
    console.log("modelFile123 store", modelStore.getAssetFiles());

    return () => h(ThreeDScene, { 
      modelFile: modelFile,
      width: '100%',
      height: '250px',
      class: 'model-preview',
      onModelLoaded: () => {
        modelStore.clearModel();
      }
    });
  }
});

// Log initial query execution
onMounted(() => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Initial queries are executing...`);
});
</script>

<style src="./catalog.css" />