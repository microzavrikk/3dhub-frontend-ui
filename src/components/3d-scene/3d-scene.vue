<script setup>
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import ThirdDModel from '../d-model-gtlf/d-model-gtlf.vue'

const props = defineProps({
  modelPath: {
    type: String,
    required: true,
    default: 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf'
  },
  cameraPosition: {
    type: Array,
    required: true,
    default: () => [2, 2, 9]
  },
  backgroundColor: {
    type: String,
    required: true,
    default: 'black'
  },
  cameraLookAt: {
    type: Array,
    required: true,
    default: () => [0, 2, 0]
  },
  directionalLightColor: {
    type: String,
    required: true,
    default: '#F78B3D'
  },
  directionalLightPosition: {
    type: Array,
    required: true,
    default: () => [3, 3, 3]
  },
  directionalLightIntensity: {
    type: Number,
    required: true,
    default: 2
  },
  ambientLightIntensity: {
    type: Number,
    required: true,
    default: 2
  },
  borderColor: {
    type: String,
    required: false,
    default: 'red'
  },
  borderWidth: {
    type: String,
    required: false,
    default: '10px'
  }
});

const gl = {
  clearColor: props.backgroundColor,
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  windowSize: false,
}

</script>
<template>
  <div style="width: 800px; height: 600px; position: relative;">
    <TresCanvas v-bind="gl" style="width: 100%; height: 100%;">
      <TresPerspectiveCamera
        :position="props.cameraPosition"
        :look-at="props.cameraLookAt"
      />
      <OrbitControls />
      <Suspense>
        <ThirdDModel :modelPath="props.modelPath" />
      </Suspense>
      <TresDirectionalLight
        :color="props.directionalLightColor"
        :position="props.directionalLightPosition"
        :intensity="props.directionalLightIntensity"
      />
      <TresAmbientLight :intensity="props.ambientLightIntensity" />
    </TresCanvas>
    <div :style="{ position: 'absolute', top: '0', left: '0', width: '98%', height: '98%', border: `${props.borderWidth} solid ${props.borderColor}` }"></div>
  </div>
</template>