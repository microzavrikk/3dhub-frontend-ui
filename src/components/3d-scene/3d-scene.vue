<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useModelStore } from '../../stores/modelStore';

const props = defineProps({
  modelFile: {
    type: File,
    required: false,
    default: null
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  shadowEnabled: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '1200px'
  },
  height: {
    type: String, 
    default: '800px'
  }
});

const container = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let currentModel: THREE.Object3D | null = null;
let directionalLight: THREE.DirectionalLight;

const modelStore = useModelStore();

const isLoading = ref(false);
const loadingProgress = ref(0);

const createGrid = () => {
  // Создаем основную сетку
  const size = 20;
  const divisions = 40; // Увеличили количество делений для более детальной сетки
  const gridHelper = new THREE.GridHelper(size, divisions);
  
  // Настраиваем цвета сетки
  const gridMaterial = gridHelper.material as THREE.Material;
  if (gridMaterial instanceof THREE.LineBasicMaterial) {
    gridMaterial.opacity = 0.2;
    gridMaterial.transparent = true;
  }
  
  // Добавляем вторую сетку для эффекта глубины
  const largeGridHelper = new THREE.GridHelper(size * 2, divisions / 2);
  if (largeGridHelper.material instanceof THREE.LineBasicMaterial) {
    largeGridHelper.material.opacity = 0.1;
    largeGridHelper.material.transparent = true;
  }
  
  scene.add(gridHelper);
  scene.add(largeGridHelper);

  // Создаем оси координат с увеличенным размером и яркостью
  const axesHelper = new THREE.AxesHelper(7);
  // Настраиваем цвета осей
  if (axesHelper.material instanceof THREE.LineBasicMaterial) {
    const colors = axesHelper.geometry.attributes.color as THREE.BufferAttribute;
    // X axis - красный
    colors.setXYZ(0, 1, 0.2, 0.2); // начало
    colors.setXYZ(1, 1, 0.2, 0.2); // конец
    // Y axis - зеленый
    colors.setXYZ(2, 0.2, 1, 0.2); // начало
    colors.setXYZ(3, 0.2, 1, 0.2); // конец
    // Z axis - синий
    colors.setXYZ(4, 0.2, 0.2, 1); // начало
    colors.setXYZ(5, 0.2, 0.2, 1); // конец
    
    colors.needsUpdate = true;
  }
  scene.add(axesHelper);
};

const init = () => {
  if (!container.value) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#1a1a1a'); // Темный фон как в Blender

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 2;

  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    shadowMap: {
      enabled: props.shadowEnabled,
      type: THREE.PCFSoftShadowMap
    }
  });
  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.castShadow = props.shadowEnabled;
  directionalLight.shadow.mapSize.width = 4096;
  directionalLight.shadow.mapSize.height = 4096;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 20;
  directionalLight.shadow.camera.left = -7;
  directionalLight.shadow.camera.right = 7;
  directionalLight.shadow.camera.top = 7;
  directionalLight.shadow.camera.bottom = -7;
  directionalLight.shadow.radius = 4;
  directionalLight.shadow.bias = -0.0005;
  scene.add(directionalLight);

  createGrid();

  if (props.shadowEnabled) {
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.ShadowMaterial({ 
      opacity: 0.3,
      transparent: true
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  
  if (camera && directionalLight) {
    // Обновляем позицию света относительно камеры
    const cameraPosition = camera.position.clone();
    const targetPosition = new THREE.Vector3(0, 0, 0);
    const direction = cameraPosition.sub(targetPosition).normalize();
    
    directionalLight.position.copy(direction.multiplyScalar(7));
    directionalLight.lookAt(0, 0, 0);
  }
  
  controls.update();
  renderer.render(scene, camera);
};

const loadModel = async (file: File) => {
  try {
    isLoading.value = true;
    loadingProgress.value = 0;
    
    if (currentModel) {
      scene.remove(currentModel);
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    console.log("file name123123: ", file.name)
    const assetFiles = modelStore.getAssetFiles();
    console.log("file name123123: ", modelStore.getAssetFiles());
    
    if (extension === 'gltf' || extension === 'glb') {
      const loader = new GLTFLoader();
      
      // Добавляем обработчик прогресса
      loader.manager.onProgress = (url, loaded, total) => {
        loadingProgress.value = (loaded / total) * 100;
      };

      const modelData = await file.arrayBuffer();

      if (extension === 'glb') {
        const gltf = await loader.parseAsync(modelData, '');
        currentModel = gltf.scene;
      } else {
        // Для GLTF файлов используем файловую систему
        const fileMap = new Map();
        assetFiles.forEach(file => {
          const fileName = file.name;
          fileMap.set(fileName, file);
          fileMap.set(`textures/${fileName}`, file);
          if (fileName.endsWith('.bin')) {
            fileMap.set(fileName.replace('scene.', ''), file);
          }
        });

        const fileLoader = new THREE.FileLoader(loader.manager);
        fileLoader.setResponseType('arraybuffer');
        
        const originalLoad = fileLoader.load;
        fileLoader.load = function(url: string, onLoad: (response: ArrayBuffer) => void) {
          const fileName = url.split('/').pop() as string;
          const file = fileMap.get(url) || fileMap.get(fileName);
          
          if (!file) {
            console.warn(`File not found: ${url}, fileName: ${fileName}`);
            return originalLoad.call(this, url, onLoad);
          }

          file.arrayBuffer().then(buffer => onLoad(buffer));
        };

        loader.manager.addHandler(/\.gltf$/, fileLoader);

        const manager = new THREE.LoadingManager();
        manager.setURLModifier((url) => {
          const fileName = url.split('/').pop() as string;
          const file = fileMap.get(url) || fileMap.get(fileName);
          if (file) {
            return URL.createObjectURL(file);
          }
          return url;
        });
        loader.manager = manager;

        const gltf = await loader.parseAsync(modelData, '');
        currentModel = gltf.scene;

        manager.setURLModifier(() => '');
      }
      
    } else if (extension === 'obj') {
      const loader = new OBJLoader();
      
      // Для OBJ файлов прогресс немного проще
      const total = file.size;
      const chunk = total / 100;
      let loaded = 0;
      
      const text = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onprogress = (event) => {
          loaded = event.loaded;
          loadingProgress.value = (loaded / total) * 100;
        };
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(file);
      });
      
      currentModel = await loader.parse(text);
    }

    if (currentModel) {
      if (props.shadowEnabled) {
        currentModel.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
      }

      const box = new THREE.Box3().setFromObject(currentModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      currentModel.scale.setScalar(scale);
      
      currentModel.position.sub(center.multiplyScalar(scale));
      scene.add(currentModel);
      modelStore.clearAssetsFiles();
    }
  } catch (error) {
    console.error('Error loading model:', error);
  } finally {
    isLoading.value = false;
    loadingProgress.value = 0;
  }
};

onMounted(() => {
  init();
  window.addEventListener('resize', handleResize);

  console.log("props ALL in 3d-scene", props);

  console.log("modelStore in 3d-scene", modelStore);
  
  if (props.modelFile) {
    loadModel(props.modelFile);
    console.log(props.modelFile);
    console.log("modelStore in 3d-scene", modelStore);
    console.log('Current asset files info:', modelStore.getAssetFiles());
    console.log('Current asset files:', modelStore.assetFiles);
    console.log("modelStore.getAssetFiles()", modelStore.getAssetFiles());
    console.log("modelStore.assetFiles", modelStore.assetFiles);
    console.log("modelStore.model", modelStore.model);
  }
  else {
    console.log("modelStore in 3d-scene", modelStore);
    console.log('Current asset files info:', modelStore.getAssetFiles());
    console.log('Current asset files:', modelStore.assetFiles);
    console.log("modelStore.getAssetFiles()", modelStore.getAssetFiles());
    console.log("modelStore.assetFiles", modelStore.assetFiles);
    console.log("modelStore.model", modelStore.model);
  }
});

watch(() => props.modelFile, (newFile) => {
  if (newFile) {
    loadModel(newFile);
  }
});

const handleResize = () => {
  if (!container.value || !camera || !renderer) return;
  
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};
</script>

<template>
  <div class="scene-container" ref="container">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-icon">
          <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
          </svg>
        </div>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${loadingProgress}%` }"></div>
          </div>
          <div class="progress-status">Loading model...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene-container {
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: fadeIn 0.3s ease;
}

.loading-content {
  width: 85%;
  max-width: 300px;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.loading-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  animation: rotate 2s linear infinite;
}

.path {
  stroke: #4CAF50;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

.progress-container {
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
  transition: width 0.3s ease;
}

.progress-status {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
