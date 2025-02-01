<template>
  <div class="search-container">
    <div class="search-box">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      <input 
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Search models, creators..."
        class="search-input"
      >
      <button 
        v-if="searchQuery" 
        @click="clearSearch" 
        class="clear-button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery && result?.GlobalSearch?.search" class="search-results">
      <!-- Debug info -->
      <div class="debug-info">
        Last query: {{ lastQuery }}
      </div>

      <!-- Models section -->
      <div class="models-section">
        <router-link 
          :to="{ name: 'Catalog', query: { search: searchQuery }}"
          class="models-count-link"
        >
          <div class="models-count">
            <span class="models-number">{{ result.GlobalSearch.search.modelsCount }} 3D Models</span>
            <span class="view-all">View all →</span>
          </div>
          <span class="execution-time">Found in {{ result.GlobalSearch.search.executionTime }}ms</span>
        </router-link>
      </div>
      
      <!-- Strong divider -->
      <div class="section-divider">
        <span class="divider-label">Creators</span>
      </div>

      <!-- Users list -->
      <div class="users-list">
        <div v-for="user in result.GlobalSearch.search.users" 
             :key="user.username"
             class="user-item">
          <img 
            :src="user.avatarUrl || 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png'" 
            :alt="user.username"
            class="user-avatar"
          >
          <span class="username">{{ user.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGlobalSearchQuery } from '../../types';
import { watch } from 'vue';

const searchQuery = ref('');
const lastQuery = ref('');

const { result, loading, refetch } = useGlobalSearchQuery(
  { query: searchQuery.value },
  { fetchPolicy: 'no-cache' }
);

let searchTimeout: NodeJS.Timeout;

const handleSearch = async () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.length >= 3) {
      try {
        lastQuery.value = searchQuery.value;
        const response = await refetch({ query: searchQuery.value });
        console.log('Search response:', response.data);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  }, 300);
};

const clearSearch = () => {
  searchQuery.value = '';
  lastQuery.value = '';
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(40, 40, 40, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 8px 16px;
  transition: all 0.2s ease;
}

.search-box:focus-within {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.search-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 12px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 15px;
  outline: none;
  padding: 4px 0;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.clear-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(35, 35, 35, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  z-index: 1000;
}

.debug-info {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin-bottom: 12px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.models-section {
  margin-bottom: 20px;
}

.models-count-link {
  display: block;
  color: #fff;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.2s ease;
}

.models-count-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.models-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.models-number {
  font-size: 16px;
  font-weight: 600;
}

.view-all {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.execution-time {
  display: block;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
}

.section-divider {
  position: relative;
  text-align: center;
  margin: 24px 0;
}

.section-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider-label {
  position: relative;
  background: rgba(35, 35, 35, 0.98);
  padding: 0 12px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.user-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.user-item:hover .user-avatar {
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.username {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
}
</style>

<style src="./search-bar.css" />