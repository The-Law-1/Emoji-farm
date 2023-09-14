<template>
    <div class="flex text-white bg-earth">

        <Bars4Icon v-if="!shopExpanded" class="w-8 cursor-pointer" @click="shopExpanded = true"></Bars4Icon>
        <XMarkIcon v-else class="w-8 cursor-pointer" @click="shopExpanded = false"></XMarkIcon>
        
        <div class="flex items-center justify-center w-full">
                <!-- Flowers -->
            <div class="flex justify-center">
                <!-- blossoms -->
                <div>

                    <div class="flex justify-center items-center">
                        <div>
                            <img class="w-16" :src="blossom"/>
                        </div>
                        <div class=" text-2xl">
                            {{ flowers }} 
                        </div>
                    </div>
                    <div class=" text-center">
                        Per second: {{ flowersPerSecond }}
                    </div>
                </div>
            </div>
        </div>

        <div class=" flex justify-center items-center mr-2 space-x-2">
            <button class="bg-stone-600 p-1 outline-stone-300 outline outline-1" @click="farmStore.saveFarm()">Save</button>
            <button class="bg-stone-600 p-1 outline-stone-300 outline outline-1" @click="farmStore.clearFarm()">Clear</button>

        </div>
    </div>
    <HelpersMenu :expanded="shopExpanded"/>

</template>

<script setup lang="ts">
import blossom from "@/assets/Plants/blossom.svg";
import { ref } from "vue";
import { useFarmStore } from "@/stores/farm";
import { useRouter } from "vue-router";
import HelpersMenu from '@/components/helpersMenu.vue';
import { Bars4Icon, XMarkIcon } from "@heroicons/vue/24/solid";
import { useShopStore } from "@/stores/shop";
import { Building } from "@/classes/building";
import { useUtilitiesStore } from "@/stores/utils";

const farmStore = useFarmStore();
const router = useRouter();
const shopStore = useShopStore();
const utilsStore = useUtilitiesStore();

let flowersPerSecond = ref(0 as number | string);

let flowers = ref(shopStore.flowers as number | string);

let shopExpanded = ref(false);

let lerp = (start, end, amt) => {
  return (1-amt)*start+amt*end;
}

// subscribe to the store
shopStore.$subscribe((mutation, state) => {
    // * this is a test of how fast pinia really is .-.

    // ! cookie clicker rounds their cookies!

    if (state.flowers >= 1e+3) {
      flowers.value = state.displayFlowers;
    } else {
      flowers.value = Math.floor(state.flowers) as number;
    }

    // 0 at the end is the initial value of the accumulator

    // round to first decimal float

    flowersPerSecond.value = Object.values(state.buildings).reduce((accumulator: number, building : Building) => accumulator + building.currentPollinationPower * building.totalOwned, 0 as number);

    flowersPerSecond.value = Number(flowersPerSecond.value.toFixed(1));

    if (flowersPerSecond.value > 1e+6) {
      flowersPerSecond.value = utilsStore.ShowBigNumber(flowersPerSecond.value);
    }
});

</script>