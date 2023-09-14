<template>

  <InfoPanel :info-panel-expanded="infoPanelExpanded" class="ml-4 select-none">

    <!-- DIV containing all the text and handles text animation a bit delayed -->
    <div class="text-base text-white p-2"
      :class="{ ' text-opacity-0 ': (!infoPanelExpanded)}">

      <!-- show the icon, and the price on the top line  -->

      <div
        class="flex justify-between items-center text-xl">
        <div class="flex items-center">
          <img :src="svgDictionary[building.svgPath]" class="w-16 pointer-events-none" />
          
          <div>
            {{ building.name }}
          </div>
        </div>

        <div
          v-show="infoPanelExpanded"
          class="flex items-center">
          <div class=" text-xl">
            {{  displayCost }}
          </div>
          <img class="w-8 h-8 pointer-events-none" :src="svgDictionary['blossom']" />
        </div>

      </div>

      <hr v-show="infoPanelExpanded"/>
      <div class=" italic text-lg">
        {{ description }}
      </div>

      <hr v-show="infoPanelExpanded"/>

      <div :class="{ 'bg-gray-400 bg-opacity-50 rounded-md italic text-sm' : (infoPanelExpanded)}">
          <!-- insert tiny flower image here -->
          {{ "Each unit produces " + parseFloat(building.currentPollinationPower.toFixed(2)) }}
          <span class="inline-flex" v-show="infoPanelExpanded">
              <img class=" w-6 pointer-events-none" :src="blossom"/>
          </span>
          <span>per second</span>
      </div>
      <div :class="{ 'bg-gray-400 bg-opacity-50 rounded-md italic text-sm' : (infoPanelExpanded)}">
          {{ building.totalOwned + " producing " + (building.currentPollinationPower * building.totalOwned).toFixed(1) + " per second" }}
      </div>
      <!-- How many you have, producing x per second -->
      <!-- Cookies generated so far? -->

      
    </div>

  </InfoPanel>

</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import InfoPanel from './InfoPanel.vue';
import { Building } from '@/classes/building';
import blossom from "@/assets/Plants/blossom.svg";
import { useUtilitiesStore } from '@/stores/utils';
import { parse } from 'path';

const utilsStore = useUtilitiesStore();

const svgDictionary = ref(utilsStore.svgDictionary);


const props = defineProps({
  infoPanelExpanded: {
    type: Boolean,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  building: {
    type: Object as PropType<Building>,
    required: true
  }
});

let displayCost = ref(utilsStore.ShowBigNumber(props.building.currentCost) as string);


</script>