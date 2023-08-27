import { GardenStats } from "@/classes/GardenStats";
import { Upgrade } from "@/classes/Upgrade";
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

            upgrades: {} as {[key: string]: Upgrade[]},

            accessibleUpgrades: [] as Upgrade[]

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

            this.checkUpgradesAccessible(building);
        },
        checkUpgradesAccessible(building: Building) {
          this.upgrades[building.name].forEach((upgrade: Upgrade) => {
            if (upgrade.owned)
              return;

            if (upgrade.condition(building)) {
              this.accessibleUpgrades.push(upgrade);
            }
          });
        },

        buyUpgrade(upgrade: Upgrade) {
          if (upgrade.cost > this.flowers)
            return;

          this.flowers -= upgrade.cost;

          upgrade.owned = true;

          upgrade.effect(this.buildings[upgrade.svgPath]);
        },

        initStore(gardenStats: GardenStats) {
            this.flowers = gardenStats.totalFlowers;
            console.log("Init store with:" + this.flowers);

            this.upgrades = gardenStats.upgrades;
            
            this.buildings = gardenStats.buildings;
            console.log(this.buildings);

            // add upgrades to accessible upgrades
            Object.values(this.buildings).forEach((building: Building) => {
              this.checkUpgradesAccessible(building);
            });

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