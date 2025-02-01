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
      <!-- Models count -->
      <div class="models-count">
        {{ result.GlobalSearch.search.modelsCount }} models
        <span class="execution-time">{{ result.GlobalSearch.search.executionTime }}ms</span>
      </div>
      
      <div class="divider"></div>

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

const { result, loading, refetch } = useGlobalSearchQuery(
  { query: searchQuery.value },
  { fetchPolicy: 'no-cache' } // Отключаем кэширование
);

let searchTimeout: NodeJS.Timeout;

const handleSearch = async () => {
  // Очищаем предыдущий таймаут если он есть
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Устанавливаем новый таймаут
  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.length >= 3) {
      try {
        await refetch({ query: searchQuery.value });
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  }, 300); // Задержка 300мс
};

const clearSearch = () => {
  searchQuery.value = '';
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
}

.search-results {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.models-count {
  color: #fff;
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.execution-time {
  color: #666;
  font-size: 12px;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 8px 0;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s;
  cursor: pointer;
}

.user-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  color: #fff;
  font-size: 14px;
}
</style>

<style src="./search-bar.css" />