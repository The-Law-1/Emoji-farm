<template>

  <div
    class="border-orange-900 opacity-50 select-none  border-solid border-4 cursor-pointer w-12 h-12 bg-green-600 flex justify-center items-center"
    :class="{ 'hover:opacity-100 hover:border-orange-600 opacity-80' : canBuyUpgrade  }"
    @click="buyUpgrade()">

    <img class="w-8 h-8 pointer-events-none" :src="svgDictionary[upgrade.svgPath]" />
    
  </div>

</template>

<script lang="ts" setup>
// import any heroicons you need here
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { PropType, computed, ref } from 'vue';
import UpgradeInfoPanel from './UpgradeInfoPanel.vue';
import { Upgrade } from '@/classes/Upgrade';
import { useUtilitiesStore } from '@/stores/utils';
import { useShopStore } from '@/stores/shop';

let utilsStore = useUtilitiesStore();
let shopStore = useShopStore();

let svgDictionary = ref(utilsStore.svgDictionary as {[key: string] : string});

const emit = defineEmits<{
  (e: 'boughtUpgrade'): void
}>();

const props = defineProps({
  upgrade: {
    type: Object as PropType<Upgrade>,
    required: true
  }
});

const buyUpgrade = ref(() => {
  console.log('buy upgrade');

  // trigger event to tell info panel to go away

  let bought = shopStore.buyUpgrade(props.upgrade);

  if (bought) {
    emit('boughtUpgrade');
  }
});

const canBuyUpgrade = computed(() => {
  return shopStore.flowers >= props.upgrade.cost;
});


</script>