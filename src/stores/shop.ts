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
        // sending args to be modified by reference
        getUpgradeFunctionArgs(upgradeFunctionArgs: { functionName: string, args: any}) {
        
          // create an array of variables from upgrade.condition.args.values
          let hardCodedArguments = Object.values(upgradeFunctionArgs.args);
          // remove the stateVariables from the array
          hardCodedArguments = hardCodedArguments.filter((arg: any) => typeof arg !== "object");

          // create an array of state variables from upgrade.condition.args.stateVariables
          let stateVariables = upgradeFunctionArgs.args.stateVariables;

          let mappedStateVariables = [];
          
          upgradeFunctionArgs.args.stateVariables.forEach((variableName: string) => {
            // if it's a number, wrap it in an object so we can pass it by reference
            // * for now this only concerns clickPower, but if we move forward with achievements for ex...
            console.log("Mapping " + variableName);
            if (typeof this[variableName] === "number") {
              console.log("Wrapping " + variableName + " in an object");
              console.log("Value " + this[variableName]);

              mappedStateVariables.push({ value: this[variableName], key: variableName });
            } else {
              mappedStateVariables.push(this[variableName]);
            }
          })

          // map the state variables to their values
          let args = [...hardCodedArguments, ...mappedStateVariables];

          return {args, mappedStateVariables};
        },
        checkUpgradesAccessible(building: Building) {
          // could be undefined while I am coding
          if (!this.upgrades[building.name])
            return;

          this.upgrades[building.name].forEach((upgrade: Upgrade) => {

            console.log(upgrade);
            if (upgrade.owned || upgrade.accessible)
              return;

            let {args, mappedStateVariables} = this.getUpgradeFunctionArgs(upgrade.condition);

            let canGetUpgrade = this.utilities.UpgradeFunctions[upgrade.condition.functionName](building, ...args);

            // the condition shouldn't change our mapped state variables, so we don't need to update our state with them

            if (canGetUpgrade) {

              // order the upgrades by cost
              this.accessibleUpgrades.forEach((u: Upgrade, index: number) => {
                if (upgrade.cost < u.cost) {
                  this.accessibleUpgrades.splice(index, 0, upgrade);
                  upgrade.accessible = true;
                  return;
                }
              });
              // if the upgrade still isn't accessible, push it to the end
              if (!upgrade.accessible) {
                this.accessibleUpgrades.push(upgrade);
                upgrade.accessible = true;
              }
            }
          });
        },

        buyUpgrade(upgrade: Upgrade) {
          if (upgrade.cost > this.flowers)
            return;

          console.log(this.utilities.UpgradeFunctions);
          console.log(upgrade.effect.functionName);


          // get args, and mapped state variables from this function
          let {args, mappedStateVariables} = this.getUpgradeFunctionArgs(upgrade.effect);

          console.log("Buy upgrade with args:", args);

          this.utilities.UpgradeFunctions[upgrade.effect.functionName](this.buildings[upgrade.buildingName], ...args);

          // loop over mappedStateVariables, and if it has a value key, set the value of our state variable to the value of the value key
          // * this is some reference mumbo jumbo, but I think it works
          mappedStateVariables.forEach((variable: any) => {
            if (variable.value) {
              this[variable.key] = variable.value;
            }
          });

          this.flowers -= upgrade.cost;

          upgrade.owned = true;

          // * this filter is kind of inefficient
          this.accessibleUpgrades = this.accessibleUpgrades.filter((u: Upgrade) => u.title !== upgrade.title);
        },

        initStore(gardenStats: GardenStats) {
            this.flowers = gardenStats.totalFlowers;
            // console.log("Init store with:" + this.flowers);

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