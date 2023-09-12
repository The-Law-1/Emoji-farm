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

    const UpgradeFunctions = {
      "UnlockUpgradeOwnedRequirements": UnlockUpgrade,
      "UpgradeBuildingPollinationPercent": UpgradeBuilding,
      "UpgradeClickAndBuildingPower": UpgradeBees
    } as {[key: string]: Function};

    

    return {
      svgDictionary,
      base64,
      UpgradeFunctions
    }
});
