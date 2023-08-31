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

    const UpgradeClick = (currentClickPower: number, improvement: number) => {
      return currentClickPower * improvement;
    };

    const UpgradeBees = (building: Building, currentClickPower: number, improvement: number) => {
      building.currentPollinationPower *= improvement;

      currentClickPower *= improvement;
    };

    const UpgradeFunctions = {
      "UnlockUpgradeOwnedRequirements": UnlockUpgrade,
      "UpgradeBuildingPollinationPercent": UpgradeBuilding,
      "UpgradeClickPower": UpgradeClick,
      "UpgradeClickAndBuildingPower": UpgradeBees
    } as {[key: string]: Function};

    

    return {
      svgDictionary,
      base64,
      UpgradeFunctions
    }
});
