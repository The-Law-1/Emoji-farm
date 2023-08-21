<template>
    <div class="relative">
        <div
            class=" h-16 select-none outline outline-2 outline-white"
            :class="canBuyBuilding ? 'bg-stone-600 cursor-pointer' : 'bg-stone-800 opacity-50 text-opacity-50'"
            @mouseenter="infoPanelExpanded = true"
            @mouseleave="infoPanelExpanded = false"
        >
            <div>
                {{ building.name }}
                <span class="">{{ building.totalOwned }}</span>
            </div>
            <div
                class="flex items-center"
                :class="canBuyBuilding ? 'text-white' : 'text-red-600'"
                >
                <img class="w-8" :src="blossom" />
                <span>{{ building.currentCost }}</span>
            </div>
        </div>
  
        <span
            v-if="canBuyBuilding"
            class="  text-base -z-10 absolute top-0 left-full h-16 w-64 bg-earth text-white pl-4 transition-all duration-300 transform"
            :class="{ '-translate-x-full text-transparent': (!infoPanelExpanded) }"
        >
            An extended panel to show info
        </span>
    </div>
</template>
  

<script setup lang="ts">
import { Building } from '@/classes/building';
import { ref } from 'vue';
import blossom from "@/assets/Plants/blossom.svg";

defineProps({
    building: {
        type: Building,
        required: true
    },
    canBuyBuilding: {
        type: Boolean,
        required: true
    }
});

let infoPanelExpanded = ref(false as Boolean);

</script>