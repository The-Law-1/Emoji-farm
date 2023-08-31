import { GardenStats } from "@/classes/GardenStats";
import { Upgrade } from "@/classes/Upgrade";
import { Building } from "@/classes/building";
import { defineStore } from "pinia";
import { useUtilitiesStore } from "./utils";

export const useShopStore = defineStore("shop", {
    state: () => {
        return {

            flowers: 0 as number,

            buildings: {} as {[key: string]: Building}, // * dictionary of buildings

            // beeIntervals: [] as unknown as NodeJS.Timeout[],

            buildingsInterval: null as unknown as NodeJS.Timeout,

            upgrades: {} as {[key: string]: Upgrade[]},

            accessibleUpgrades: [] as Upgrade[],

            utilities: useUtilitiesStore(),

            currentClickPower: 1 as number

        }
    },
    getters: {

    },
    actions: {
        clickOnFlower() {
          this.reapFlower(this.currentClickPower);
        },
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
          // could be undefined while I am coding
          if (!this.upgrades[building.name])
            return;

          this.upgrades[building.name].forEach((upgrade: Upgrade) => {

            console.log(upgrade);
            if (upgrade.owned || this.accessibleUpgrades.includes(upgrade))
              return;

            let canGetUpgrade = this.utilities.UpgradeFunctions[upgrade.condition.functionName](building, ...upgrade.condition.args);
            if (canGetUpgrade) {
              this.accessibleUpgrades.push(upgrade);
            }
          });
        },

        buyUpgrade(upgrade: Upgrade) {
          if (upgrade.cost > this.flowers)
            return;

          console.log(this.utilities.UpgradeFunctions);
          console.log(upgrade.effect.functionName);
          this.utilities.UpgradeFunctions[upgrade.effect.functionName](this.buildings[upgrade.svgPath], ...upgrade.effect.args);

          this.flowers -= upgrade.cost;

          upgrade.owned = true;

          // * this filter is kind of inefficient
          this.accessibleUpgrades = this.accessibleUpgrades.filter((u: Upgrade) => u.title !== upgrade.title);
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