<template>
    <!-- Clicking this will give you 1 x clickpower flowers -->
    <img class=" w-28 cursor-pointer select-none pointer-events-none" :src="skin" @click="clickedFlower"/>
</template>

<script setup lang="ts">
import { useFarmStore } from '@/stores/farm';
import { useShopStore } from '@/stores/shop';
import { ref } from 'vue';


const props = defineProps({
    skin: {
        type: String,
        required: true
    }
});

const farmStore = useFarmStore();
const shopStore = useShopStore();


const clickedFlower = ref(() => {
  shopStore.clickOnFlower();
});


</script>