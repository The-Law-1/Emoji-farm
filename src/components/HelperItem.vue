<template>
    <div class="relative">
        <div
            class=" h-fit select-none outline outline-2 outline-white"
            :class="(canBuyBuilding && accessible) ? 'bg-stone-600 cursor-pointer hover:bg-stone-500' : 'bg-stone-800 opacity-50 text-opacity-50'"
            @mouseenter="infoPanelExpanded = true"
            @mouseleave="infoPanelExpanded = false"
        >
          <div class="flex justify-between">

            <div class="flex">
              <img class="w-16 pointer-events-none"
                :class="accessible ? 'brightness-100' : 'brightness-0'"
                :src="svgDictionary[building.svgPath]" />
              <!-- name and cost div -->
              <div>
                <div>
                  {{ accessible ? building.name : "???" }}
                  <!-- <span class="">{{ building.totalOwned }}</span> -->
                </div>
      
                <div
                    class="flex items-center"
                    :class="(canBuyBuilding && accessible) ? 'text-white' : 'text-red-600'"
                    >
                    <img class="w-8 pointer-events-none" :src="blossom" />
                    <span>{{ accessible ? displayCost : "???" }}</span>
                </div>
              </div>

            </div>
            <div class="flex items-center text-4xl pr-1">{{ building.totalOwned }}</div>
          </div>
         
          
        </div>

        <HelperInfoPanel
          :info-panel-expanded="accessible && infoPanelExpanded.valueOf()"
          :description="building.description"
          :building="building"
          :building-image="svgDictionary[building.svgPath]">

        </HelperInfoPanel>        
    </div>
</template>
  
<script setup lang="ts">
import { Building } from '@/classes/building';
import { PropType, computed, ref } from 'vue';
import blossom from "@/assets/Plants/blossom.svg";
import HelperInfoPanel from './HelperInfoPanel.vue';
import { useUtilitiesStore } from '@/stores/utils';

let utilsStore = useUtilitiesStore();
let svgDictionary = ref(utilsStore.svgDictionary as {[key: string] : string});

const props = defineProps({
    building: {
        type: Object as PropType<Building>,
        required: true
    },
    canBuyBuilding: {
        type: Boolean,
        required: true
    },
    accessible: {
        type: Boolean,
        required: true
    }
});

const displayCost = computed(() => {
    return utilsStore.ShowBigNumber(props.building.currentCost);
});

let infoPanelExpanded = ref(false as Boolean);

</script>