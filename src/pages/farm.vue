<template>
    <div class="mt-[20%] flex justify-center items-center">
        <MainFlower :skin="svgDictionary[mainFlowerName.toLowerCase()]"/>

        <!-- TODO could be a p5js canvas so you can drag/scroll to see your flowers -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFarmStore } from "@/stores/farm";
import { useRouter } from 'vue-router';
import { useUtilitiesStore } from '@/stores/utils';
import MainFlower from "@/components/mainFlower.vue";

// const farmStore = useFarmStore();

const utilsStore = useUtilitiesStore();
const farmStore = useFarmStore();
const router = useRouter();

const svgDictionary = ref(utilsStore.svgDictionary);

const mainFlowerName = ref("blossom");

// we call this all the time, but the store checks if it's already been called
farmStore.initFarm();

onMounted(() => {
});

</script>