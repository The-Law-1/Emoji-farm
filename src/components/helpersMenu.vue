<template>
    <div
      class="fixed h-full w-72 bg-earth text-white p-4 transition-transform duration-300 transform"
      :class="{ '-translate-x-full': !expanded }"
    >

      <!-- I guess width 64 - padding 4 that we use up there? I'm confused ngl -->
      <div class=" w-60">

        <div v-show="accessibleUpgrades.length > 0"
          class=" text-2xl font-medium">
          Upgrades
        </div>
        <div class=" flex flex-wrap">
          <HelperUpgrade v-for="upgrade in accessibleUpgrades"
            :upgrade="upgrade"
            :key="upgrade.title"
            @mouseover="currentUpgradeHovered = upgrade"
            @mouseleave="currentUpgradeHovered = null">
          </HelperUpgrade>
        </div>

        <UpgradeInfoPanel
          v-if="currentUpgradeHovered !== null"
          :upgrade="currentUpgradeHovered"
          :info-panel-expanded="true">
          
        </UpgradeInfoPanel>
      </div>

      <!--  sepearator -->
      <div class="w-full rounded-lg h-1 bg-white  my-4">
      </div>

      <!-- Your menu content goes here -->
      <ul class=" text-2xl space-y-2">
        <!-- v-for on Object.values(buildings) ? -->
        <HelperItem v-for="(building, i) in Object.values(buildings)"
          :key="'buildings-' + i"
          :building="building"
          :can-buy-building="canBuyBuildings[building.name]"
          @click="() => buyBuilding(building.name)">
        </HelperItem>
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
import HelperUpgrade from './HelperUpgrade.vue';
import { Upgrade } from '@/classes/Upgrade';
import UpgradeInfoPanel from './UpgradeInfoPanel.vue';

let farmStore = useFarmStore();
let shopStore = useShopStore();

let buildings = ref(shopStore.buildings as {[key: string] : Building});

let canBuyBuildings = ref({} as {[key: string] : boolean});

let accessibleUpgrades = ref([] as Upgrade[]);

let currentUpgradeHovered = ref(null as Upgrade | null);

farmStore.$subscribe((mutation, state) => {
});

shopStore.$subscribe((mutation, state) => {
    buildings.value = state.buildings;

    // this is perhaps overkill?
    Object.entries(buildings.value).forEach(([name, building] : [string, Building]) => {
        canBuyBuildings.value[name] = state.flowers >= building.currentCost;
    });

    accessibleUpgrades.value = state.accessibleUpgrades;
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