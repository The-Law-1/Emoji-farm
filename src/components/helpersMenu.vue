<template>
    <div
      class="fixed h-full w-64 bg-earth text-white p-4 transition-transform duration-300 transform"
      :class="{ '-translate-x-full': !expanded }"
    >
      <!-- Your menu content goes here -->
      <ul class=" text-2xl space-y-2">

        <!-- v-for on Object.values(buildings) ? -->
        <HelperItem v-if="buildings['bee'] !== undefined"
            :building="(buildings['bee'] as Building)"
            :can-buy-building="canBuyBuildings['bee'] !== undefined ? canBuyBuildings['bee'] : false"
            :description="'A helpful bee to pollinate your flowers'"
            @click="() => buyBuilding('bee')">

        </HelperItem>

        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>

      <div class="mt-10 overflow-y-scroll max-h-48 grid grid-cols-3">
        <!-- <HelperUpgrade>
        </HelperUpgrade>
        <HelperUpgrade>
        </HelperUpgrade>
        <HelperUpgrade>
        </HelperUpgrade>

        <HelperUpgrade>
        </HelperUpgrade> -->

      </div>
    </div>
  </template>
  
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useFarmStore } from "@/stores/farm";
import { useShopStore } from "@/stores/shop";
import blossom from "@/assets/Plants/blossom.svg";
import { Building } from '@/classes/building';
import HelperItem from './HelperItem.vue';
import HelperUpgrade from './HelperUpgrade.vue';

let farmStore = useFarmStore();
let shopStore = useShopStore();

let buildings = ref(shopStore.buildings as {[key: string] : Building});

let canBuyBuildings = ref({} as {[key: string] : boolean});

farmStore.$subscribe((mutation, state) => {
});

shopStore.$subscribe((mutation, state) => {
    buildings.value = state.buildings;

    // this is perhaps overkill?
    Object.entries(buildings.value).forEach(([name, building] : [string, Building]) => {
        canBuyBuildings.value[name] = state.flowers >= building.currentCost;
    });
});

let buyBuilding = ref((name: string) => {
    shopStore.buyBuilding(name);
});

var props = defineProps({
    expanded: {
        type: Boolean,
        required: false
    }
})

</script>