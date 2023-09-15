
<template>
  <div class=" h-[100vh]">
    <!-- sidebar -->
    <!-- Header -->
    <Header/>
    <slot />
    <div class=" flex justify-center">
      <Footer/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

</script>
