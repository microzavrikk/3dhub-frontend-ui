import { defineStore } from 'pinia';

interface SingleModelState {
  modelUrls: string[];
  currentModelIndex: number;
  loadingProgress: number;
  isLoading: boolean;
}

export const useSingleModelStore = defineStore('singleModel', {
  state: (): SingleModelState => ({
    modelUrls: [],
    currentModelIndex: 0,
    loadingProgress: 0,
    isLoading: false
  }),

  getters: {
    currentModelUrl: (state): string | null => {
      return state.modelUrls[state.currentModelIndex] || null;
    },

    hasModels: (state): boolean => {
      return state.modelUrls.length > 0;
    },

    modelCount: (state): number => {
      return state.modelUrls.length;
    }
  },

  actions: {
    setLoadingProgress(progress: number) {
      this.loadingProgress = progress;
    },

    setIsLoading(loading: boolean) {
      this.isLoading = loading;
    },

    setModelUrls(urls: string[]) {
      // Clean up existing blob URLs
      this.clearUrls();
      
      this.modelUrls = urls;
      this.currentModelIndex = 0;
      this.logStoreState();
    },

    addModelUrl(url: string) {
      if (!this.modelUrls.includes(url)) {
        this.modelUrls.push(url);
        this.logStoreState();
      }
    },

    removeModelUrl(url: string) {
      const index = this.modelUrls.indexOf(url);
      if (index > -1) {
        // Revoke the blob URL
        URL.revokeObjectURL(url);
        
        this.modelUrls = this.modelUrls.filter(u => u !== url);
        
        // Adjust current index if needed
        if (this.currentModelIndex >= this.modelUrls.length) {
          this.currentModelIndex = Math.max(0, this.modelUrls.length - 1);
        }
        
        this.logStoreState();
      }
    },

    nextModel() {
      if (this.modelUrls.length > 0) {
        this.currentModelIndex = (this.currentModelIndex + 1) % this.modelUrls.length;
      }
    },

    previousModel() {
      if (this.modelUrls.length > 0) {
        this.currentModelIndex = this.currentModelIndex === 0 
          ? this.modelUrls.length - 1 
          : this.currentModelIndex - 1;
      }
    },

    clearUrls() {
      // Revoke all blob URLs
      this.modelUrls.forEach(url => {
        URL.revokeObjectURL(url);
      });
      
      this.modelUrls = [];
      this.currentModelIndex = 0;
      this.logStoreState();
    },

    logStoreState(): void {
      console.group('Single Model Store State');
      console.log('Model URLs Count:', this.modelUrls.length);
      console.log('Current Model Index:', this.currentModelIndex);
      console.log('Current Model URL:', this.currentModelUrl);
      console.log('Loading Progress:', this.loadingProgress);
      console.log('Is Loading:', this.isLoading);
      
      console.group('All Model URLs:');
      this.modelUrls.forEach((url, index) => {
        console.log(`Model ${index}:`, url);
      });
      console.groupEnd();
      
      console.groupEnd();
    }
  }
});
