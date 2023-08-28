<template>

  <InfoPanel :info-panel-expanded="infoPanelExpanded" >

    <!-- DIV containing all the text and handles text animation a bit delayed -->
    <div class="text-base text-white p-2"
      :class="{ ' text-opacity-0 ': (!infoPanelExpanded)}">

      <!-- show the icon, and the price on the top line  -->

      <div
        class="flex justify-between items-center text-xl">
        <div class="flex items-center">
          <img :src="buildingImage" class="w-16" />
          
          <div>
            {{ building.name }}
          </div>
        </div>

        <div
          v-show="infoPanelExpanded"
          class="flex items-center">
          <div class=" text-xl">
            {{ building.currentCost }}
          </div>
          <img class="w-8 h-8" :src="svgDictionary['blossom']" />
        </div>

      </div>

      <hr v-show="infoPanelExpanded"/>
      <div class=" italic text-lg">
        {{ description }}
      </div>

      <hr v-show="infoPanelExpanded"/>

      <div :class="{ 'bg-gray-400 bg-opacity-50 rounded-md italic text-sm' : (infoPanelExpanded)}">
          <!-- insert tiny flower image here -->
          {{ "Each unit produces " + building.currentPollinationPower.toFixed(2) }}
          <span class="inline-flex" v-show="infoPanelExpanded">
              <img class=" w-6" :src="blossom"/>
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

const utilsStore = useUtilitiesStore();

const svgDictionary = ref(utilsStore.svgDictionary);

defineProps({
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
  },
  buildingImage: {
    type: String,
    required: true
  }
});

</script>