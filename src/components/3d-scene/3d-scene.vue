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
  }
});

const container = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let currentModel: THREE.Object3D | null = null;

const modelStore = useModelStore();

const init = () => {
  if (!container.value) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

const loadModel = async (file: File) => {
  try {
    if (currentModel) {
      scene.remove(currentModel);
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    const assetFiles = modelStore.getAssetFiles();
    
    if (extension === 'gltf' || extension === 'glb') {
      const loader = new GLTFLoader();
      
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
      let urlModifier: ((url: string) => string) | null = null;
      
      manager.setURLModifier((url) => {
        const fileName = url.split('/').pop() as string;
        const file = fileMap.get(url) || fileMap.get(fileName);
        if (file) {
          return URL.createObjectURL(file);
        }
        return url;
      });
      loader.manager = manager;

      const modelData = await file.arrayBuffer();
      const gltf = await loader.parseAsync(modelData, '');
      currentModel = gltf.scene;

      manager.setURLModifier(() => '');
      
    } else if (extension === 'obj') {
      const loader = new OBJLoader();
      const text = await file.text();
      currentModel = await loader.parse(text);
    }

    if (currentModel) {
      const box = new THREE.Box3().setFromObject(currentModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      currentModel.scale.setScalar(scale);
      
      currentModel.position.sub(center.multiplyScalar(scale));
      scene.add(currentModel);
    }
  } catch (error) {
    console.error('Error loading model:', error);
  }
};

onMounted(() => {
  init();
  window.addEventListener('resize', handleResize);
  
  if (props.modelFile) {
    loadModel(props.modelFile);
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
  <div class="scene-container" ref="container"></div>
</template>

<style scoped>
.scene-container {
  width: 500px;
  height: 400px;
  background: #1a1a2e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>