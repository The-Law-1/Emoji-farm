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
            class="  text-base -z-10 absolute top-0 left-full h-auto w-64 bg-earth text-white pl-4 transition-all duration-300 transform"
            :class="{ '-translate-x-full text-earth': (!infoPanelExpanded) }"
        >
            <div>
                {{ description }}
            </div>


            <div :class="{ 'bg-gray-400 bg-opacity-50 rounded-md' : (infoPanelExpanded)}">
                <!-- insert tiny flower image here -->
                {{ "Each unit produces " + building.currentPollinationPower }}
                <span class="inline-flex" v-show="infoPanelExpanded">
                    <img class=" w-4" :src="blossom"/>
                </span>
                <span>per second</span>
            </div>
            <div :class="{ 'bg-gray-400 bg-opacity-50 rounded-md' : (infoPanelExpanded)}">
                {{ building.totalOwned + " producing " + (building.currentPollinationPower * building.totalOwned).toFixed(1) + " per second" }}
            </div>
            <!-- How many you have, producing x per second -->
            <!-- Cookies generated so far? -->
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
    },
    description: {
        type: String,
        required: false
    }
});

let infoPanelExpanded = ref(false as Boolean);

</script>