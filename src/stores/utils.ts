import blossom from "@/assets/Plants/blossom.svg";
import bee from "@/assets/Helpers/bee.svg";
import { defineStore } from 'pinia';
import { Base64 } from "./utils/base64";
import { Building } from "@/classes/building";

export const useUtilitiesStore = defineStore('utilities', () => {
    const svgDictionary = {
        blossom,
        bee
    };

    const base64 = Base64;

    const UnlockUpgrade = (building: Building, minimumOwned: number) => {
      if (building.totalOwned >= minimumOwned) {
        return true;
      }
      return false;
    }
    
    const UpgradeBuilding = (building: Building, improvement: number) => {
      building.currentPollinationPower *= improvement;
    }

    const UpgradeFunctions = {
      "UnlockUpgradeOwnedRequirements": UnlockUpgrade,
      "UpgradeBuildingPollinationPercent": UpgradeBuilding,
    } as {[key: string]: Function};

    

    return {
      svgDictionary,
      base64,
      UpgradeFunctions
    }
});
