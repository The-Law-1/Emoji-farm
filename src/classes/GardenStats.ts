import { Upgrade } from "./Upgrade";
import { Building } from "./building";

export class GardenStats {
    totalFlowers: number = 0;

    pollinationPower: number = 1;

    buildings: {[name: string]: Building} = {
      "bee": new Building("bee", "A helpful bee to pollinate your flowers", 0.2, 0.2, 15, 15, 1.1, "bee"),
      "Dew collector": new Building("Dew collector", "Collect morning dew to provide a natural source of hydration for your flowers", 0.5, 0.5, 100, 100, 1.1, "droplet"),
    };

    // the function name stuff is kind of sucky, but I need to serialize it somehow, a pity we don't really know what the arguments are...
    upgrades: {[name: string]: Upgrade[]} = {
      "bee": [
        new Upgrade("Faster bees", "bee", "bee", "Bees and cursor are twice as efficient", "Bzzzzzz",  100,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                    { functionName: "UpgradeClickAndBuildingPower", args: { improvement: 2, stateVariables: ["currentClickPower"] } }),
        new Upgrade("Pollen backpacks", "bee", "bee", "Bees and cursor are twice as efficient", "Handy, nutrient-rich pollination", 1000,
                  { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                  { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
                ],
      "Dew collector": [
        new Upgrade("Aqua booster", "Dew collector", "droplet", "Dew collectors are twice as efficient", "Advanced condensation technology", 250,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Morning mist magnifier", "Dew collector", "droplet", "Dew collectors are twice as efficient", "Specialized lenses, capturing even the tiniest droplets from the morning mist", 500,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Crystal dew reservoir", "Dew collector", "droplet", "Dew collectors are twice as efficient", "A crystal-clear dew reservoir that stores larger quantities of refreshing dew, keeping your garden hydrated for longer periods", 2000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 20, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        ]
      }
}