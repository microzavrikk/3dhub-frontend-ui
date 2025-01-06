<template>
    <div ref="modelContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script>
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export default {
    name: 'View3DModel',
    mounted() {
        this.initThreeJS();
    },
    methods: {
        initThreeJS() {
            const container = this.$refs.modelContainer;

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 5;

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(1, 1, 1).normalize();
            scene.add(light);

            const loader = new OBJLoader();
            loader.load('C:/Users/New/repos/3dhub-frontend-ui/uploads_files_2792345_Koenigsegg.obj', (object) => {
                scene.add(object);
            });

            const animate = () => {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };
            animate();

            window.addEventListener('resize', () => {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            });
        }
    }
};
</script>

<style scoped>
</style>