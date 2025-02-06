import { defineStore } from 'pinia';

interface ModelState {
  model: File | null;
  previewUrl: string | null;
  assetFiles: File[];
  assetUrls: Map<string, string>;
  loadingProgress: number;
  isLoading: boolean;
  instanceId: string; // Add unique instance ID
}

export const useModelStore = defineStore('model', {
  state: (): ModelState => ({
    model: null,
    previewUrl: null,
    assetFiles: [],
    assetUrls: new Map(),
    loadingProgress: 0,
    isLoading: false,
    instanceId: Math.random().toString(36).substring(7) // Generate random ID
  }),

  getters: {
    storeDebugInfo: (state): object => ({
      instanceId: state.instanceId,
      modelFileName: state.model?.name || 'No file selected',
      modelFileSize: state.model ? `${(state.model.size / 1024).toFixed(2)} KB` : 'N/A',
      modelFileType: state.model?.type || 'N/A',
      previewUrl: state.previewUrl || 'No preview URL',
      lastModified: state.model ? new Date(state.model.lastModified).toLocaleString() : 'N/A',
      assetFilesCount: state.assetFiles.length
    })
  },

  actions: {
    setLoadingProgress(progress: number) {
      this.loadingProgress = progress;
    },

    setIsLoading(loading: boolean) {
      this.isLoading = loading;
    },

    async setModel(file: File): Promise<void> {
      this.setIsLoading(true);
      this.setLoadingProgress(0);
      
      console.log(`[Instance ${this.instanceId}] Setting model:`, file.name);
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }

      console.log(`[Instance ${this.instanceId}] file:`, file);
            
      this.model = file;
      this.previewUrl = URL.createObjectURL(file);

      console.log('model', this.model);
      console.log('previewUrl', this.previewUrl);
      
      await this.addAssetFile(file);
      
      this.setIsLoading(false);
      this.logStoreState();
    },
    
    getModel(): File | null {
      return this.model;
    },
    
    async addAssetFile(file: File): Promise<void> {
      console.log(`[Instance ${this.instanceId}] Adding asset file:`, file.name);

      const extension = file.name.split('.').pop()?.toLowerCase();
      const acceptedTypes = ['gltf', 'obj', 'bin', 'png', 'jpg', 'jpeg'];
      
      if (extension && acceptedTypes.includes(extension)) {
        if (!this.assetFiles.find(f => f.name === file.name)) {
          this.assetFiles.push(file);
          const url = URL.createObjectURL(file);
          this.assetUrls.set(`${this.instanceId}_${file.name}`, url); // Namespace URLs with instance ID
        }
      }
    },

    removeAssetFile(file: File): void {
      this.assetFiles = this.assetFiles.filter(f => f.name !== file.name);
      const urlKey = `${this.instanceId}_${file.name}`;
      if (this.assetUrls.has(urlKey)) {
        URL.revokeObjectURL(this.assetUrls.get(urlKey)!);
        this.assetUrls.delete(urlKey);
      }
      
      if (this.model && file.name === this.model.name) {
        this.model = null;
        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
          this.previewUrl = null;
        }
      }
      
      this.logStoreState();
    },

    getAssetFiles(): File[] {
      if(this.assetFiles.length > 0) {
        return this.assetFiles;
      }
      else {
        console.log(`[Instance ${this.instanceId}] No asset files found`);
      }
      return [];
    },
    
    getAssetUrl(fileName: string): string | undefined {
      return this.assetUrls.get(`${this.instanceId}_${fileName}`);
    },
    
    clearModel(): void {
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
      
      this.assetUrls.forEach(url => {
        URL.revokeObjectURL(url);
      });
      
      this.model = null;
      this.previewUrl = null;
      this.assetFiles = [];
      this.assetUrls.clear();
      
      this.logStoreState();
    },

    logStoreState(): void {
      console.group(`Model Store State [Instance ${this.instanceId}]`);
      console.log('Debug Info:', this.storeDebugInfo);
      
      console.group('Model Files:');
      if (this.model) {
        console.log('Main Model:', {
          name: this.model.name,
          url: this.previewUrl,
          size: `${(this.model.size / 1024).toFixed(2)} KB`
        });
      }
      console.groupEnd();

      console.group('Asset Files:');
      this.assetFiles.forEach(file => {
        const url = this.assetUrls.get(`${this.instanceId}_${file.name}`);
        console.log(`${file.name}:`, {
          url: url,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          type: file.type
        });
      });
      console.groupEnd();

      console.groupEnd();
    }
  }
});