import blossom from "@/assets/Plants/blossom.svg";
import bee from "@/assets/Helpers/bee.svg";
import droplet from "@/assets/Helpers/droplet.svg";
import ladyBug from "@/assets/Helpers/ladybug.svg";
import worm from "@/assets/Helpers/worm.svg";
import fountain from "@/assets/Helpers/fountain.svg";
import rain from "@/assets/Helpers/rain.svg";
import treeLife from "@/assets/Helpers/treelife.svg";
import wizard from "@/assets/Helpers/wizard.svg";
import { defineStore } from 'pinia';
import { Base64 } from "./utils/base64";
import { Building } from "@/classes/building";

export const useUtilitiesStore = defineStore('utilities', () => {
    const svgDictionary = {
        blossom,
        bee,
        droplet,
        ladyBug,
        worm,
        fountain,
        rain,
        treeLife,
        wizard
    };

    const base64 = Base64;

    const numberWithCommas = (x: number) => {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    const ShowBigNumber = (number: number, precision: number = 3) => {
      const bigNumbers = {
        1e+48: "Quindecillion",
        1e+45: "Quattuordecillion",
        1e+42: "Tredecillion",
        1e+39: "Duodecillion",
        1e+36: "Undecillion",
        1e+33: "Decillion",
        1e+30: "Nonillion",
        1e+27: "Octillion",
        1e+24: "Septillion",
        1e+21: "Sextillion",
        1e+18: "Quintillion",
        1e+15: "Quadrillion",
        1e+12: "Trillion",
        1e+9: "Billion",
        1e+6: "Million",
      }

      if (number < 1e+6) {
        // * these regexes didn't work haha localestring does though
        //https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators

        number = Math.floor(number);

        return number.toLocaleString();
        // return numberWithCommas(number);
        // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      let lastFound = "";

      // ordered from big to small so we can return the first one that fits
      for (const [key, value] of Object.entries(bigNumbers)) {
        if (number >= Number(key)) {
          lastFound = `${(number / Number(key)).toFixed(precision)} ${value}`;
        }
      }

      return lastFound;

    };

    // * Take building, hard coded upgrade, then state variables

    const UnlockUpgrade = (building: Building, minimumOwned: number) => {
      if (building.totalOwned >= minimumOwned) {
        return true;
      }
      return false;
    }
    
    const UpgradeBuilding = (building: Building, improvement: number) => {
      building.currentPollinationPower *= improvement;
    }

    // we need to send the current click power as an object, so we can change its' value
    const UpgradeBees = (building: Building, improvement: number, currentClickPower: any) => {
      building.currentPollinationPower *= improvement;

      currentClickPower.value *= improvement;
    };

    // * I have dubbed "CollectionBonus" the bonus that applies based on your amount of other buildings
    const ClickAndBuildingCollectionBonus = (building: Building, improvement: number, currentClickPower: any, otherBuildings: Building[]) => {
      let totalOtherBuildings = 0;

      // iterate through dictionary
      for (const [key, otherBuilding] of Object.entries(otherBuildings)) {
        if (key === building.name) 
          continue;
        totalOtherBuildings += otherBuilding.totalOwned;
      }

      // console.warn("Improving by:", improvement * totalOtherBuildings);
      currentClickPower.value *= improvement * totalOtherBuildings;

      building.currentPollinationPower *= improvement * totalOtherBuildings;
    }

    const UpgradeFunctions = {
      "UnlockUpgradeOwnedRequirements": UnlockUpgrade,
      "UpgradeBuildingPollinationPercent": UpgradeBuilding,
      "UpgradeClickAndBuildingPower": UpgradeBees,
      "ClickAndBuildingCollectionBonus": ClickAndBuildingCollectionBonus
    } as {[key: string]: Function};

    

    return {
      svgDictionary,
      base64,
      UpgradeFunctions,
      ShowBigNumber
    }
});
