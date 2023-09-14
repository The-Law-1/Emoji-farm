<template>
  <div class="relative">

      <!-- Clicking this will give you 1 x clickpower flowers -->
    <img class=" w-80 cursor-pointer select-none" style="user-drag: none; -webkit-user-drag: none;" :src="skin" @click="clickedFlower"/>
      
      <!-- place this div randomly every click -->
    <div v-for="(clickNumber, i) in clickNumbers"
      :key="'Clicknumber-' + i" 
      :id="'Clicknumber-' + i"
      :class="`absolute select-none animate-fade_out`"
      class=" opacity-0  text-2xl pointer-events-none">
      {{ "+" + currentClickPower }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFarmStore } from '@/stores/farm';
import { useShopStore } from '@/stores/shop';
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps({
    skin: {
        type: String,
        required: true
    }
});

const farmStore = useFarmStore();
const shopStore = useShopStore();

let currentClickPower = ref(shopStore.currentClickPower as number);

shopStore.$subscribe((mutation, state) => {
    currentClickPower.value = state.currentClickPower;
});

let clickNumbers = ref([]);

let resetTimeout = ref(null);

// clearing every minute to protect memory overflow in case of bots for example
// if clicknumbers gets too high, clear it
// * I can't decide if this is better or worse than a timer that clears it every minute
watch(clickNumbers.value, (newValue, oldValue) => {
  if (newValue.length > 10000) {
    clickNumbers.value = [];
    console.log("Forefully clearing clickNumbers");
  }
});

const clickedFlower = ref(() => {
  shopStore.clickOnFlower();

  // Generate random positions for the div
  const randomX = Math.random() * 240;
  const randomY = Math.random() * 240;

  clickNumbers.value.push({x: randomX, y: randomY});

  if (resetTimeout) clearTimeout(resetTimeout);

  // if user doesn't click for 3 seconds, clear the clickNumbers array
  resetTimeout = setTimeout(() => {
    clickNumbers.value = [];
    console.log("Cleared clickNumbers");
  }, 3000);

  // // Update the style of the div
  nextTick(() => {
    const div = document.getElementById("Clicknumber-" + (clickNumbers.value.length - 1));

    // * if I cleared it before the timeout, it will be null
    if (div) {
      div.style.top = randomY.toString() + "px";
      div.style.left = randomX.toString() + "px";
    }

    // timeout to remove div from clickNumbers
    // setTimeout(() => {
    //   clickNumbers.value.shift();
    // }, 3000);

    // Use a timeout to hide the div after a delay (e.g., 2 seconds)
    // setTimeout(() => {
    //   this.showDiv = false;
    // }, 2000); // Adjust the delay as needed
  });
});


</script>