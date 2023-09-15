<template>

  <div v-if="finishedUpgrades" class="flex text-white bg-earth justify-center rounded-md text-center p-1 ">
    Impossible...
    <br/>
    You have just bought the final upgrade. To do so, you first had to buy dozens of buildings, click the flower many, many times.<br/>
    You had to buy all the upgrades, and then you had to buy the final upgrade.
    <br/>
    You did it. You won. You beat the game.
    <br/>
    You are now free to do whatever you want. You can keep clicking the flower, or you can just leave it be.
    <br/>
    You can keep buying buildings, and increasing your flower count until you run into floating point errors.
    <br/>
    Thank you for playing. I hope you enjoyed it.
  </div>

</template>

<script setup lang="ts">
import { useShopStore } from '@/stores/shop';
import { ref } from 'vue';

let shopStore = useShopStore();

let finishedUpgrades = ref(false);

// subscribe to state
shopStore.$subscribe((mutation, state) => {
  finishedUpgrades.value = state.finishedUpgrades;
});
</script>