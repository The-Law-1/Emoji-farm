<template>

  <InfoPanel
    class="  "
    :info-panel-expanded="infoPanelExpanded">
    <div>
      {{ upgrade.title }}
    </div>

    <div>
      {{ upgrade.description }}
    </div>

  </InfoPanel>

</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import InfoPanel from './InfoPanel.vue';
import {Upgrade} from '@/classes/Upgrade';

defineProps({
  infoPanelExpanded: {
    type: Boolean,
    required: true
  },
  upgrade: {
    type: Object as PropType<Upgrade>,
    required: true
  }
});

</script>