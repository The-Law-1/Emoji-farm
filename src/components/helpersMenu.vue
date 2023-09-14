<template>
    <div
      class="fixed h-full w-72 bg-earth text-white p-4 transition-transform duration-300 transform select-none"
      :class="{ '-translate-x-full': !expanded }"
    >

      <!-- I guess width 64 - padding 4 that we use up there? I'm confused ngl -->
      <div class=" w-60">

        <div v-show="accessibleUpgrades.length > 0"
          class=" text-2xl font-medium select-none">
          Upgrades
        </div>
        <div class=" flex flex-wrap">
          <HelperUpgrade v-for="(upgrade, idx) in accessibleUpgrades"
            :upgrade="upgrade"
            :key="upgrade.title"
            @bought-upgrade="() => currentUpgradeHovered = null"
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

        <!-- TODO canBuyBuildings is undefined sometimes? Find out why  -->
        <HelperItem v-for="(building, i) in Object.values(buildings)"
          :key="'buildings-' + i"
          v-show="buildingUnlocked(i)"
          :accessible="buildingAccessible(i)"
          :building="building"
          :can-buy-building="canBuyBuildings[building.name] !== undefined && canBuyBuildings[building.name]"
          @click="() => buyBuilding(building.name, i)">
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

let buildingAccessible = ref((idx: number) => {

  let buildingsArray = Object.values(buildings.value);

  if (idx === 0) {
    return true;
  }

  if (buildingsArray[idx - 1].totalOwned > 0) {
    return true;
  }

  return false;
});

let buildingUnlocked = ref((idx) => {

  if (idx < 2) {
    return true;
  }

  let previousBuilding = Object.values(buildings.value)[idx - 2];

  if (previousBuilding.totalOwned > 0) {
    return true;
  }

  return false;
});

let buyBuilding = ref((name: string, i: number) => {
    if (buildingAccessible.value(i)) {
      shopStore.buyBuilding(name);
    }
});

var props = defineProps({
    expanded: {
        type: Boolean,
        required: false
    }
})

</script>