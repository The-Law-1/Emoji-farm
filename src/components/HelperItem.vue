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

        <HelperInfoPanel
          :info-panel-expanded="infoPanelExpanded.valueOf()"
          :description="description"
          :building="building">

        </HelperInfoPanel>        
    </div>
</template>
  
<script setup lang="ts">
import { Building } from '@/classes/building';
import { PropType, ref } from 'vue';
import blossom from "@/assets/Plants/blossom.svg";
import HelperInfoPanel from './HelperInfoPanel.vue';

defineProps({
    building: {
        type: Object as PropType<Building>,
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