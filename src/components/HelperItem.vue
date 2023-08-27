<template>
    <div class="relative">
        <div
            class=" h-16 select-none outline outline-2 outline-white"
            :class="canBuyBuilding ? 'bg-stone-600 cursor-pointer hover:bg-stone-500' : 'bg-stone-800 opacity-50 text-opacity-50'"
            @mouseenter="infoPanelExpanded = true"
            @mouseleave="infoPanelExpanded = false"
        >
          <div class="flex justify-between">
            <!-- name and cost div -->
            <div>
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

            <img class="w-16"
               :src="svgDictionary[building.name]" />
          </div>
        </div>

        <HelperInfoPanel
          :info-panel-expanded="infoPanelExpanded.valueOf()"
          :description="description"
          :building="building"
          :building-image="svgDictionary[building.name]">

        </HelperInfoPanel>        
    </div>
</template>
  
<script setup lang="ts">
import { Building } from '@/classes/building';
import { PropType, ref } from 'vue';
import blossom from "@/assets/Plants/blossom.svg";
import HelperInfoPanel from './HelperInfoPanel.vue';
import { useUtilitiesStore } from '@/stores/utils';

let utilsStore = useUtilitiesStore();
let svgDictionary = ref(utilsStore.svgDictionary as {[key: string] : string});

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