import { Upgrade } from "./Upgrade";
import { Building } from "./building";

export class GardenStats {
    totalFlowers: number = 0;

    pollinationPower: number = 1;

    buildings: {[name: string]: Building} = {
      "bee": new Building("bee", 0.2, 0.2, 15, 15, 1.1, "bee")
    };

    // the function name stuff is kind of sucky, but I need to serialize it somehow, a pity we don't really know what the arguments are...
    upgrades: {[name: string]: Upgrade[]} = {
      "bee": [
          new Upgrade("Faster bees", "bee", "Bees are twice as efficient", 1,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                      { functionName: "UpgradeClickAndBuildingPower", args: { improvement: 2, stateVariables: ["currentClickPower"] } }),
          new Upgrade("Pollen backpacks", "bee", "Bees are twice as efficient", 1000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
        ]
      }
}