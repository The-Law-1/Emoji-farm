<template>
    <!-- Clicking this will give you 1 x clickpower flowers -->
    <img class="w-24 cursor-pointer select-none" :src="skin" @click="clickedFlower"/>
</template>

<script setup lang="ts">
import { useFarmStore } from '@/stores/farm';
import { ref } from 'vue';


const props = defineProps({
    skin: {
        type: String,
        required: true
    }
});

const farmStore = useFarmStore();

const clickedFlower = ref(() => {
    let pollinationPower = farmStore.gardenStats.pollinationPower;
    farmStore.pollinateFlower(pollinationPower);
});


</script>