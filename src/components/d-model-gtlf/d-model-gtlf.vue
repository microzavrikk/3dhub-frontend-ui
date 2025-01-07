<script setup lang="ts">
import { ref, PropType } from 'vue'
import { useAnimations, useGLTF } from '@tresjs/cientos'

const props = defineProps({
  modelPath: {
    type: String as PropType<string>,
    required: true,
    default: ''
  },
  initialAnimation: {
    type: String as PropType<string>,
    default: 'Greeting'
  }
})

const { scene: model, animations } = await useGLTF(props.modelPath)
const { actions } = useAnimations(animations, model)
const currentAction = ref(actions[props.initialAnimation])
currentAction.value.play()
</script>

<template>
  <div>
    <primitive :object="model" />
  </div>
</template>