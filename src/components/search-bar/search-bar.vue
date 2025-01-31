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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');

const handleSearch = () => {
  // TODO: Implement search logic
  console.log('Searching for:', searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = '';
};
</script>

<style scoped>
.search-container {
  width: 100%;
}

.search-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(30, 30, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  background: rgba(40, 40, 40, 0.8);
  border-color: #4CAF50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.2);
}

.search-icon {
  color: #666;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;
  padding: 4px 0;
}

.search-input::placeholder {
  color: #666;
}

.clear-button {
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.clear-button:hover {
  color: #fff;
}
</style>
