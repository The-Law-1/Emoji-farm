import { Upgrade } from "./Upgrade";
import { Building } from "./building";

export class GardenStats {
    totalFlowers: number = 0;

    pollinationPower: number = 1;

    buildings: {[name: string]: Building} = {
      "bee": new Building("bee", 0.2, 0.2, 15, 15, 1.1, "bee")
    };

    upgrades: {[name: string]: Upgrade[]} = {
      "bee": [
          new Upgrade("Faster bees", "bee", "Bees are 10% more efficient", 100,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: [1]},
                      { functionName: "UpgradeBuildingPollinationPercent", args: [1.1]},),
          new Upgrade("Pollen backpacks", "bee", "Bees are 15% more efficient", 1000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: [1]},
                    { functionName: "UpgradeBuildingPollinationPercent", args: [1.15]}),
        ]
      }
}