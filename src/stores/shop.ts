import { GardenStats } from "@/classes/GardenStats";
import { Building } from "@/classes/building";
import { FLOWBASEANNOTATION_TYPES } from "@babel/types";
import { defineStore } from "pinia";

export const useShopStore = defineStore("shop", {
    state: () => {
        return {

            flowers: 0 as number,

            buildings: {} as {[key: string]: Building}, // * dictionary of buildings

            // beeIntervals: [] as unknown as NodeJS.Timeout[],

            buildingsInterval: null as unknown as NodeJS.Timeout,

        }
    },
    getters: {

    },
    actions: {
        reapFlower(flowerYield: number) {
            this.flowers += flowerYield;
        },

        buyBuilding(buildingName: string) {
            // let building = this.buildings.find((b : [string, Building]) => b[0] === buildingName) as Building; // essentially the same if not better than a dictionary
            let building = this.buildings[buildingName];

            if (building.currentCost > this.flowers) {
                return;
            }

            this.flowers -= building.currentCost;

            building.totalOwned += 1;

            building.currentCost = Math.round(building.baseCost * Math.pow(building.costMultiplier, building.totalOwned));
        },
        initStore(gardenStats: GardenStats) {
            this.flowers = gardenStats.totalFlowers;
            console.log("Init store with:" + this.flowers);

            this.buildings = gardenStats.buldings;

            this.buildingsInterval = setInterval(() => {
                // loop through your buildings dictionary, and calculate how many you increase by
                var totalReap = 0;

                Object.entries(this.buildings).forEach(([name, building] : [string, Building]) => {
                    let amount = building.totalOwned;
                    let power = building.currentPollinationPower;

                    totalReap += amount * power;
                });

                this.reapFlower(totalReap);
            }, 1000);
        }

    }

});