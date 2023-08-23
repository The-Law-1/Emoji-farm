<template>
    <div
      class="fixed h-full w-64 bg-earth text-white p-4 transition-transform duration-300 transform"
      :class="{ '-translate-x-full': !expanded }"
    >
      <!-- Your menu content goes here -->
      <ul class=" text-2xl space-y-2">
        <!-- BEES DIV -->
        <!-- TODO each of these is a component that has its own side bar that opens on hover -->
        

        <!-- v-for on Object.values(buildings) ? -->
        <HelperItem v-if="buildings['bees'] !== undefined"
            :building="(buildings['bees'] as Building)"
            :can-buy-building="canBuyBuildings['bees']"
            :description="'Helpful bees to pollinate your flowers'"
            @click="() => buyBuilding('bees')">

        </HelperItem>

        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
      
    </div>
  </template>
  
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useFarmStore } from "@/stores/farm";
import { useShopStore } from "@/stores/shop";
import blossom from "@/assets/Plants/blossom.svg";
import { Building } from '@/classes/building';
import HelperItem from './HelperItem.vue';

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