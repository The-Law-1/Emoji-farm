<template>
  <span
    class="ml-5 absolute opacity-100 top-0 left-full h-auto  w-96 bg-earth transition-opacity duration-300 rounded-sm transform outline outline-orange-400"
    :class="{ ' -z-10 bg-transparent text-opacity-0 opacity-0 -translate-x-full outline-none outline-0 ': (!infoPanelExpanded) }"
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