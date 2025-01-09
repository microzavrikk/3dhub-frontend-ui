import { defineStore } from 'pinia';

interface ModelState {
  modelFile: File | null;
  previewUrl: string | null;
}

export const useModelStore = defineStore('model', {
  state: (): ModelState => ({
    modelFile: null,
    previewUrl: null
  }),
  
  getters: {
    storeDebugInfo: (state): object => ({
      modelFileName: state.modelFile?.name || 'No file selected',
      modelFileSize: state.modelFile ? `${(state.modelFile.size / 1024).toFixed(2)} KB` : 'N/A',
      modelFileType: state.modelFile?.type || 'N/A',
      previewUrl: state.previewUrl || 'No preview URL',
      lastModified: state.modelFile ? new Date(state.modelFile.lastModified).toLocaleString() : 'N/A'
    })
  },

  actions: {
    setModel(file: File): void {
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
      
      this.modelFile = file;
      this.previewUrl = URL.createObjectURL(file) as string;
      
      this.logStoreState();
    },
    
    clearModel(): void {
      if (this.previewUrl && typeof this.previewUrl === 'string') {
        URL.revokeObjectURL(this.previewUrl);
      }
      this.modelFile = null;
      this.previewUrl = null;
      
      this.logStoreState();
    },

    logStoreState(): void {
      console.group('Model Store State');
      console.log('Debug Info:', this.storeDebugInfo);
      console.log('Raw State:', {
        modelFile: this.modelFile,
        previewUrl: this.previewUrl
      });
      console.groupEnd();
    }
  }
});