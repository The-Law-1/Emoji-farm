<template>

  <InfoPanel :info-panel-expanded="infoPanelExpanded" >

    <!-- DIV containing all the text and handles text animation a bit delayed -->
    <div class="text-base text-white "
      :class="{ ' text-opacity-0 ': (!infoPanelExpanded)}">

      <!-- show the icon, and the price on the top line  -->

      <div class="flex justify-between">

        <div>
          {{ description }}
        </div>

        <img v-show="infoPanelExpanded" :src="buildingImage" class="w-16" />
      </div>

      <hr v-show="infoPanelExpanded"/>

      <div :class="{ 'bg-gray-400 bg-opacity-50 rounded-md' : (infoPanelExpanded)}">
          <!-- insert tiny flower image here -->
          {{ "Each unit produces " + building.currentPollinationPower }}
          <span class="inline-flex" v-show="infoPanelExpanded">
              <img class=" w-6" :src="blossom"/>
          </span>
          <span>per second</span>
      </div>
      <div :class="{ 'bg-gray-400 bg-opacity-50 rounded-md' : (infoPanelExpanded)}">
          {{ building.totalOwned + " producing " + (building.currentPollinationPower * building.totalOwned).toFixed(1) + " per second" }}
      </div>
      <!-- How many you have, producing x per second -->
      <!-- Cookies generated so far? -->
    </div>

  </InfoPanel>

</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import InfoPanel from './InfoPanel.vue';
import { Building } from '@/classes/building';
import blossom from "@/assets/Plants/blossom.svg";

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