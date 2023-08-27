import { Upgrade } from "./Upgrade";
import { Building } from "./building";

function UnlockUpgrade(building: Building, minimumOwned: number) {
  if (building.totalOwned >= minimumOwned) {
    return true;
  }
  return false;
}

function UpgradeBuilding(building: Building, improvement: number) {
  building.currentPollinationPower *= improvement;
}

export class GardenStats {
    totalFlowers: number = 0;

    pollinationPower: number = 1;


    buildings: {[name: string]: Building} = {
      "bee": new Building("bee", 0.2, 0.2, 15, 15, 1.1, "bee")
    };

    upgrades: {[name: string]: Upgrade[]} = {
      "bee": [
          new Upgrade("Faster bees", "bee", "Bees are 10% more efficient", 100,
                      (building: Building) => UnlockUpgrade(building, 1),
                      (building: Building) => UpgradeBuilding(building, 1.1)),
          new Upgrade("Pollen backpacks", "bee", "Bees are 15% more efficient", 1000,
                      (building: Building) => UnlockUpgrade(building, 100),
                      (building: Building) => UpgradeBuilding(building, 1.15))
        ]
      }
}