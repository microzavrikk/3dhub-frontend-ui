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

        <div class="filter-group price-filter">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            Price Range
          </h3>
          <div class="price-range-container">
            <div class="price-input-group">
              <label>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/>
                </svg>
                Min
              </label>
              <div class="price-input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  type="number"
                  v-model.number="priceRange.min"
                  :placeholder="filterStore.priceRange.min.toString()"
                  class="price-input"
                  @input="validatePriceRange"
                >
              </div>
            </div>
            <div class="price-range-divider"></div>
            <div class="price-input-group">
              <label>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/>
                </svg>
                Max
              </label>
              <div class="price-input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  type="number"
                  v-model.number="priceRange.max"
                  :placeholder="filterStore.priceRange.max.toString()"
                  class="price-input"
                  @input="validatePriceRange"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z"/>
            </svg>
            Categories
          </h3>
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
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
            </svg>
            Popular Tags
          </h3>
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
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            File Format
          </h3>
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
          <h2>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Explore 3D Models
          </h2>
          <div class="sort-controls">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
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
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
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
                  <h3>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                    <span>{{ model.name }}</span>
                  </h3>
                  <p class="model-author">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    by {{ model.ownerId }}
                  </p>
                </div>
                <div class="model-tags">
                  <template v-if="model.tags && model.tags.length > 0">
                    <span 
                      v-for="tag in model.tags" 
                      :key="tag"
                      class="model-tag"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                      </svg>
                      {{ tag }}
                    </span>
                  </template>
                  <span v-else class="no-tags">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                      <line x1="7" y1="7" x2="7.01" y2="7"/>
                    </svg>
                    No Tags
                  </span>
                </div>
                <div class="model-footer">
                  <div class="model-price">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
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
      zoomLevel: 2.5,
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