import { GardenStats } from "@/classes/GardenStats";
import { Building } from "@/classes/building";
import { defineStore } from "pinia";

export const useShopStore = defineStore("shop", {
    state: () => {
        return {

            flowers: 0 as number,

            buildings: {} as {[key: string]: Building}, // * dictionary of buildings

            // beeIntervals: [] as unknown as NodeJS.Timeout[],

            buildingsInterval: null as unknown as NodeJS.Timeout,

            // todo and then an array/dict of them
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

            building.currentCost = Math.round(building.baseCost * Math.pow(building.costMultiplier, building.totalOwned));

            building.totalOwned += 1;
        },
        // buyBee() {

        //     if (this.flowers < this.beesCost) {
        //         return;
        //     }

        //     this.flowers -= this.beesCost;

        //     this.beesCost = Math.round(this.beesBasePrice * Math.pow(this.beesCostMultiplier, this.bees))

        //     this.bees += 1;

            // * this would be ridiculous but I think this is how cookie clicker achieves its updating of cookies more than once a second
            // * and then what you increase bee power and update all the intervals?? Insane
            // this.beeIntervals.push(setInterval(() => {
            //     this.reapFlower(this.beesPower);
            // }, 1000));

            // * the most efficient would be to have 1 interval for all the buildings then, and all the flowers would increment at the same time, much more optimised
            // if (this.beesInterval === null) {

            //     this.beesInterval = setInterval(() => {
            //         this.reapFlower(this.bees * this.beesPower);
            //     }, 1000);
            // }

        // },
        initStore(gardenStats: GardenStats) {
            this.flowers = gardenStats.totalFlowers;

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