import { defineStore } from "pinia";
import { GardenStats } from "@/classes/GardenStats";
import { useShopStore } from "./shop";
import { useUtilitiesStore } from "./utils";

export const useFarmStore = defineStore("farm", {

    state: () => {
        return {
            // blossomStats: {} as FlowerStats,
            gardenStats: new GardenStats() as GardenStats,
            shopStore: useShopStore(),

            beesInterval: null as unknown as NodeJS.Timeout,

            // currentInterval: null as unknown as NodeJS.Timeout,
            gardenInitialized: false,

            utilsStore: useUtilitiesStore()
        }
    },
    actions: {
        saveFarm() {

            this.gardenStats.handMadeFlowers = this.shopStore.handMadeFlowers;

            this.gardenStats.currentClickPower = this.shopStore.currentClickPower;

            this.gardenStats.finishedUpgrades = this.shopStore.finishedUpgrades;

            this.gardenStats.totalFlowers = this.shopStore.flowers;

            this.gardenStats.upgrades = this.shopStore.upgrades;

            let baseString = JSON.stringify(this.gardenStats);

            let encoded = this.utilsStore.base64.encode(baseString);


            // store encoded string in local storage
            localStorage.setItem("gardenStats", encoded);

            alert("Game saved!");
        },
        clearFarm() {
            localStorage.removeItem("gardenStats");
        },
        initFarm() {
            
            if (this.gardenInitialized) {
                return;
            }

            if (localStorage.getItem("gardenStats") !== null) {

                let encoded = localStorage.getItem("gardenStats") as string;

                let decoded = this.utilsStore.base64.decode(encoded);

                this.gardenStats = JSON.parse(decoded) as GardenStats;
            }
            // init the shop store with gardenstats
            let shopStore = useShopStore();

            shopStore.initStore(this.gardenStats);
    

            this.gardenInitialized = true;
        }
    }


    // return {
    //     plantFlower,
    //     unPlantFlower,
    //     initFarm,
    //     getGarden
    // }
});