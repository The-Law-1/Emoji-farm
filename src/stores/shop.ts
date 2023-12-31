import { GardenStats } from "@/classes/GardenStats";
import { Upgrade } from "@/classes/Upgrade";
import { Building } from "@/classes/building";
import { defineStore } from "pinia";
import { useUtilitiesStore } from "./utils";

export const useShopStore = defineStore("shop", {
    state: () => {
        return {

            flowers: 0,

            buildings: {} as {[key: string]: Building}, // * dictionary of buildings

            totalBuildings: 0 as number,

            // beeIntervals: [] as unknown as NodeJS.Timeout[],

            buildingsInterval: null as unknown as NodeJS.Timeout,

            upgrades: {} as {[key: string]: Upgrade[]},

            accessibleUpgrades: [] as Upgrade[],

            utilities: useUtilitiesStore(),

            currentClickPower: 1 as number,

            displayFlowers: "0" as string,

            handMadeFlowers: 0 as number,

            totalPerSecond: 0 as number,

            finishedUpgrades: false as boolean // to get all the upgrades you need all the buildings
        }
    },
    getters: {

    },
    actions: {
        clickOnFlower() {
          this.reapFlower(this.currentClickPower);

          // increment hand-made flowers

          this.handMadeFlowers += this.currentClickPower;

          this.checkClickUpgradesAccessible();
        },
        // hoping no entity has the power to reap more than 2^53 flowers
        reapFlower(flowerYield: number) {

          this.flowers += flowerYield;

          if (this.flowers >= 1e+3) {
            this.displayFlowers = this.utilities.ShowBigNumber(this.flowers);
          }
        },
        buyBuilding(buildingName: string) {
            // let building = this.buildings.find((b : [string, Building]) => b[0] === buildingName) as Building; // essentially the same if not better than a dictionary
            let building = this.buildings[buildingName] as Building;

            if (building.currentCost > this.flowers) {
                return;
            }

            this.flowers -= building.currentCost;
            // resets display
            this.reapFlower(0);

            building.totalOwned += 1;

            building.currentCost = Math.round(building.baseCost * Math.pow(building.costMultiplier, building.totalOwned));

            this.checkUpgradesAccessible(building);

            this.totalPerSecond = Object.values(this.buildings).reduce((accumulator: number, building : Building) => accumulator + building.currentPollinationPower * building.totalOwned, 0 as number);
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
            // console.log("Mapping " + variableName);
            if (typeof this[variableName] === "number") {
              // console.log("Wrapping " + variableName + " in an object");
              // console.log("Value " + this[variableName]);

              mappedStateVariables.push({ value: this[variableName], key: variableName });
            } else {
              mappedStateVariables.push(this[variableName]);
            }
          })

          // map the state variables to their values
          let args = [...hardCodedArguments, ...mappedStateVariables];

          return {args, mappedStateVariables};
        },
        checkClickUpgradesAccessible(init: boolean = false) {

          // loop through all click upgrades
          this.upgrades["Click"].forEach((upgrade: Upgrade) => {
            // if the upgrade is already owned, or accessible, return
            if (upgrade.owned || (!init && upgrade.accessible)) {
              return;
            }
            
            let {args, mappedStateVariables} = this.getUpgradeFunctionArgs(upgrade.condition);

            let canGetUpgrade = this.utilities.UpgradeFunctions[upgrade.condition.functionName](null, ...args);

            // the condition shouldn't change our mapped state variables, so we don't need to update our state with them
            if (canGetUpgrade) {

              let added = false;
              // order the upgrades by cost
              this.accessibleUpgrades.every((u: Upgrade, index: number) => {
                if (upgrade.cost < u.cost) {
                  console.log("Adding upgrade ", upgrade.title, " at index ", index);
                  this.accessibleUpgrades.splice(index, 0, upgrade);
                  upgrade.accessible = true;

                  added = true;

                  // https://masteringjs.io/tutorials/fundamentals/foreach-break
                  // * with accessibleUpgrades.every, returning false breaks the loop
                  return false;
                }
                return true;
              });
              // if the upgrade still isn't added, push it to the end
              if (!added) {
                this.accessibleUpgrades.push(upgrade);
                upgrade.accessible = true;
              }
            }
          });
        },

        checkUpgradesAccessible(building: Building, init: boolean = false) {
          // could be undefined while I am coding
          if (!this.upgrades[building.name])
            return;

          this.upgrades[building.name].forEach((upgrade: Upgrade) => {

            if (upgrade.owned || (!init && upgrade.accessible))
              return;

            let {args, mappedStateVariables} = this.getUpgradeFunctionArgs(upgrade.condition);

            let canGetUpgrade = this.utilities.UpgradeFunctions[upgrade.condition.functionName](building, ...args);

            // the condition shouldn't change our mapped state variables, so we don't need to update our state with them

            if (canGetUpgrade) {

              let added = false;

              // order the upgrades by cost
              this.accessibleUpgrades.every((u: Upgrade, index: number) => {
                if (upgrade.cost < u.cost) {
                  console.log("Adding upgrade ", upgrade.title, " at index ", index);
                  this.accessibleUpgrades.splice(index, 0, upgrade);
                  upgrade.accessible = true;

                  added = true;

                  // https://masteringjs.io/tutorials/fundamentals/foreach-break
                  // * with accessibleUpgrades.every, returning false breaks the loop
                  return false;
                }
                return true;
              });
              // if the upgrade still isn't added, push it to the end
              if (!added) {
                this.accessibleUpgrades.push(upgrade);
                upgrade.accessible = true;
              }
            }
          });
        },
        buyUpgrade(upgrade: Upgrade) {

          if (upgrade.cost > this.flowers)
            return false;

          // console.log(this.utilities.UpgradeFunctions);
          // console.log(upgrade.effect.functionName);


          // get args, and mapped state variables from this function
          let {args, mappedStateVariables} = this.getUpgradeFunctionArgs(upgrade.effect);

          console.log("Buy upgrade with args:", args);

          // building name will be null if it's a click upgrade
          this.utilities.UpgradeFunctions[upgrade.effect.functionName](upgrade.buildingName === "Click" ? null : this.buildings[upgrade.buildingName], ...args);

          // loop over mappedStateVariables, and if it has a value key, set the value of our state variable to the value of the value key
          // * this is some reference mumbo jumbo, but I think it works
          mappedStateVariables.forEach((variable: any) => {
            if (variable.value) {
              this[variable.key] = variable.value;
            }
          });

          this.flowers -= upgrade.cost;
          this.reapFlower(0);

          upgrade.owned = true;

          // find it in our this.upgrades and apply owned = true
          this.upgrades[upgrade.buildingName].find((u: Upgrade) => u.title === upgrade.title).owned = true;

          this.totalPerSecond = Object.values(this.buildings).reduce((accumulator: number, building : Building) => accumulator + building.currentPollinationPower * building.totalOwned, 0 as number);

          // TODO this filter is kind of inefficient
          this.accessibleUpgrades = this.accessibleUpgrades.filter((u: Upgrade) => u.title !== upgrade.title);

          let ownedUpgrades = Object.values(this.upgrades).reduce((accumulator: number, upgrade: Upgrade) => accumulator + (upgrade.owned ? 1 : 0), 0 as number);

          console.log(ownedUpgrades);
          console.log(Object.values(this.upgrades).length);
          if (ownedUpgrades === Object.values(this.upgrades).length) {
            this.finishedUpgrades = true;
          }

          return true;
        },

        initStore(gardenStats: GardenStats) {
            this.flowers = gardenStats.totalFlowers;
            // console.log("Init store with:" + this.flowers);

            this.currentClickPower = gardenStats.currentClickPower;

            this.handMadeFlowers = gardenStats.handMadeFlowers;

            this.finishedUpgrades = gardenStats.finishedUpgrades;

            // this inits the flowerDisplay if it's bigger than 1e+6
            this.reapFlower(0);

            this.upgrades = gardenStats.upgrades;
            
            this.buildings = gardenStats.buildings;
            console.log(this.buildings);

            // add upgrades to accessible upgrades
            Object.values(this.buildings).forEach((building: Building) => {
              this.checkUpgradesAccessible(building, true);
            });

            this.checkClickUpgradesAccessible(true);

            this.totalBuildings = Object.keys(this.buildings).length;

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