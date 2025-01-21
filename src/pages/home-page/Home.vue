<template>
    <div class="server-ping">
      <h3>Server Ping</h3>
      <div v-if="loading">Loading...</div>
      <div class="response" v-else-if="result?.Ping">
        Server response: {{ result.Ping.ping }}
      </div>
      <div class="error" v-else-if="error">
        Error: {{ error.message }}
      </div>
      <button @click="refetch" :disabled="loading">
        {{ loading ? 'Pinging...' : 'Ping Server' }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { usePingServerQuery } from '../../types';
  const { result, loading, error, refetch } = usePingServerQuery()
  </script>
  
  <style scoped>
  .server-ping {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-width: 300px;
  }
  
  .response {
    margin: 10px 0;
    padding: 10px;
    background-color: #e8f5e9;
    border-radius: 4px;
  }
  
  .error {
    margin: 10px 0;
    padding: 10px;
    background-color: #ffebee;
    border-radius: 4px;
    color: #d32f2f;
  }
  
  button {
    padding: 8px 16px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style> 