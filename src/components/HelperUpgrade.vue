<template>

  <div
    class="border-orange-900 opacity-90 hover:opacity-100 hover:border-orange-600 border-solid border-4 cursor-pointer w-12 h-12 bg-green-600 flex justify-center items-center"
    @mouseenter="infoPanelExpanded = true"
    @mouseleave="infoPanelExpanded = false">

    <img class="w-8 h-8" :src="svgDictionary[upgrade.svgPath]" />
    <!-- <XMarkIcon class="w-8 h-8 text-white" /> -->

    <!-- <UpgradeInfoPanel
      :info-panel-expanded="infoPanelExpanded.valueOf()"
      :upgrade="upgrade">

    </UpgradeInfoPanel> -->
  </div>

</template>

<script lang="ts" setup>
// import any heroicons you need here
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { PropType, ref } from 'vue';
import UpgradeInfoPanel from './UpgradeInfoPanel.vue';
import { Upgrade } from '@/classes/Upgrade';
import { useUtilitiesStore } from '@/stores/utils';

var infoPanelExpanded = ref(false as Boolean);

let utilsStore = useUtilitiesStore();

let svgDictionary = ref(utilsStore.svgDictionary as {[key: string] : string});

// TODO on click buy upgrade

defineProps({
  upgrade: {
    type: Object as PropType<Upgrade>,
    required: true
  }
});

</script>