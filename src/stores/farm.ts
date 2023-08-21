import { Flower } from "@/classes/flower";
import { defineStore } from "pinia";
import { GardenStats } from "@/classes/GardenStats";
import { useShopStore } from "./shop";

export const useFarmStore = defineStore("farm", {

    // state: {
    //     garden: [] as Flower[][];
    // }
    state: () => {
        return {
            garden: [] as Flower[], // maybe an array of strings that are the flower names and their positions?
            // blossomStats: {} as FlowerStats,
            gardenStats: new GardenStats() as GardenStats ,
            shopStore: useShopStore(),

            // TODO you will likely have an interval for each building type, so a dictionary of them?
            beesInterval: null as unknown as NodeJS.Timeout,

            // currentInterval: null as unknown as NodeJS.Timeout,
            gardenInitialized: false
        }
    },
    actions: {
        // * all number types are started as floating points
        pollinateFlower(power: number) {

            // * implement buffs etc... here!
            this.shopStore.reapFlower(power);
        },
        saveFarm() {
            // TODO convert your gardenstats into base JSON string then into base64 and store in localstorage

        },
        initFarm() {
            
            if (this.gardenInitialized) {
                return;
            }

            // TODO: load garden and stats from local storage

            // load gardenstats with local storage
            // this.gardenStats.load(string)

            // init the shop store with gardenstats
            let shopStore = useShopStore();

            shopStore.initStore(this.gardenStats);
    
            this.gardenInitialized = true;
        }
    }

    // let garden = [] as Flower[][];


    // return {
    //     plantFlower,
    //     unPlantFlower,
    //     initFarm,
    //     getGarden
    // }
});