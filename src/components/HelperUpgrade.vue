<template>

  <div
    class="border-orange-900 opacity-90 hover:opacity-100 hover:border-orange-600 border-solid border-4 cursor-pointer w-12 h-12 bg-green-600 flex justify-center items-center"
    @mouseenter="infoPanelExpanded = true"
    @mouseleave="infoPanelExpanded = false">
    <XMarkIcon class="w-8 h-8 text-white" />

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

var infoPanelExpanded = ref(false as Boolean);

defineProps({
  upgrade: {
    type: Object as PropType<Upgrade>,
    required: true
  }
});

</script>