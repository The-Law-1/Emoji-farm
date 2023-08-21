
<template>
  <div class=" h-[100vh]">
    <!-- sidebar -->
    <!-- Header -->
    <Header/>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";

</script>
