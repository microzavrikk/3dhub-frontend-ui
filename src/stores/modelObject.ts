export class ModelObject {
  private model: File | null = null;
  private previewUrl: string | null = null;
  private assetFiles: File[] = [];
  private assetUrls: Map<string, string> = new Map();
  private loadingProgress: number = 0;
  private isLoading: boolean = false;

  get debugInfo(): object {
    return {
      modelFileName: this.model?.name || 'No file selected',
      modelFileSize: this.model ? `${(this.model.size / 1024).toFixed(2)} KB` : 'N/A',
      modelFileType: this.model?.type || 'N/A', 
      previewUrl: this.previewUrl || 'No preview URL',
      lastModified: this.model ? new Date(this.model.lastModified).toLocaleString() : 'N/A',
      assetFilesCount: this.assetFiles.length
    };
  }

  setLoadingProgress(progress: number): void {
    this.loadingProgress = progress;
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  async setModel(file: File): Promise<void> {
    this.setIsLoading(true);
    this.setLoadingProgress(0);
    
    console.log('Setting model:', file.name);
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }

    console.log("file", file);
          
    this.model = file;
    this.previewUrl = URL.createObjectURL(file);
    
    await this.addAssetFile(file);
    
    this.setIsLoading(false);
    this.logStoreState();
  }
  
  getModel(): File | null {
    return this.model;
  }
  
  async addAssetFile(file: File): Promise<void> {
    console.log('Adding asset file:', file.name);

    const extension = file.name.split('.').pop()?.toLowerCase();
    const acceptedTypes = ['gltf', 'obj', 'bin', 'png', 'jpg', 'jpeg'];
    
    if (extension && acceptedTypes.includes(extension)) {
      if (!this.assetFiles.find(f => f.name === file.name)) {
        this.assetFiles.push(file);
        const url = URL.createObjectURL(file);
        this.assetUrls.set(file.name, url);
      }
    }
  }

  removeAssetFile(file: File): void {
    this.assetFiles = this.assetFiles.filter(f => f.name !== file.name);
    if (this.assetUrls.has(file.name)) {
      URL.revokeObjectURL(this.assetUrls.get(file.name)!);
      this.assetUrls.delete(file.name);
    }
    
    if (this.model && file.name === this.model.name) {
      this.model = null;
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
        this.previewUrl = null;
      }
    }
    
    this.logStoreState();
  }

  getAssetFiles(): File[] {
    if(this.assetFiles.length > 0) {
      return this.assetFiles;
    }
    console.log("No asset files found");
    return [];
  }
  
  getAssetUrl(fileName: string): string | undefined {
    return this.assetUrls.get(fileName);
  }
  
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
  }

  logStoreState(): void {
    console.group('Model Object State');
    console.log('Debug Info:', this.debugInfo);
    
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
      const url = this.assetUrls.get(file.name);
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
