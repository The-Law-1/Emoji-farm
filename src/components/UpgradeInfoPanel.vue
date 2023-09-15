<template>

  <InfoPanel
    class=" p-2 select-none"
    :info-panel-expanded="infoPanelExpanded">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <img class="w-12 h-12 pointer-events-none" :src="svgDictionary[upgrade.svgPath]" />
        <div class=" text-xl underline">
          {{ upgrade.title }}
        </div>
      </div>

      <div class="flex items-center">
        <div class=" text-xl"
          :class="canBuyUpgrade ? 'text-green-500' : 'text-red-500'"
          
            >
          {{ displayCost }}
        </div>
        <img class="w-8 h-8" :src="svgDictionary['blossom']" />
      </div>
    </div>
    <div class=" bg-slate-300 bg-opacity-40 w-fit rounded text-sm">
      Upgrade
    </div>
    <hr/>
    <div class="text-lg  font-medium">
      {{ upgrade.description }}
    </div>

    <div class="flex justify-end text-gray-400 italic text-sm">
      {{ upgrade.subDescription }}
    </div>

  </InfoPanel>

</template>

<script lang="ts" setup>
import { PropType, computed, ref } from 'vue';
import InfoPanel from './InfoPanel.vue';
import {Upgrade} from '@/classes/Upgrade';
import { useUtilitiesStore } from '@/stores/utils';
import { useShopStore } from '@/stores/shop';

const utilsStore = useUtilitiesStore();
const shopStore = useShopStore();

const svgDictionary = ref(utilsStore.svgDictionary as {[key: string] : string});

const props = defineProps({
  infoPanelExpanded: {
    type: Boolean,
    required: true
  },
  upgrade: {
    type: Object as PropType<Upgrade>,
    required: true
  }
});

const displayCost = computed(() => {
  return utilsStore.ShowBigNumber(props.upgrade.cost);
});

const canBuyUpgrade = computed(() => {
  return shopStore.flowers >= props.upgrade.cost;
});

</script>