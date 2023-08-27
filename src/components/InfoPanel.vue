<template>
  <span
    class="-z-10 absolute opacity-100 top-0 left-full h-auto w-64 bg-earth pl-4  transition-opacity duration-300 transform"
    :class="{ 'text-opacity-0 opacity-0 -translate-x-full ': (!infoPanelExpanded) }"
    >
      <slot/>
  </span>
</template>

<script lang="ts" setup>

defineProps({
  infoPanelExpanded: {
    type: Boolean,
    required: true
  }
})

</script>