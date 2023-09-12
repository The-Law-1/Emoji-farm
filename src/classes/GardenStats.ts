import { Upgrade } from "./Upgrade";
import { Building } from "./building";

export class GardenStats {
    totalFlowers: number = 0;

    pollinationPower: number = 1;

    buildings: {[name: string]: Building} = {
      "bee": new Building("bee", "A helpful bee to pollinate your flowers", 0.1, 0.1, 15, 15, 1.15, "bee"),
      "Dew collector": new Building("Dew collector", "Collect morning dew to provide a natural source of hydration for your flowers", 1, 1, 100, 100, 1.15, "droplet"),
      "Ladybug": new Building("Ladybug Nursery", "Nurture ladybugs, natural predators of garden pests, to keep your garden pest-free.", 8, 8, 1000, 1000, 1.15, "ladyBug"),

      "Worm hotel": new Building("Worm Hotel", "Provide a comfortable home for earthworms, which help improve soil quality and aeration.", 50, 50, 12000, 12000, 1.15, "worm"),
      "Rain Wizard": new Building("Rain Wizard", "Summon rain wizards to conjure rain for your thirsty flowers", 300, 300, 150000, 150000, 1.15, "wizard"),

      // Tree of Life: Plant a special tree that supports diverse wildlife and serves as the heart of your garden ecosystem.
      "Tree of life": new Building("Tree of Life", "Plant a special tree that supports diverse wildlife and serves as the heart of your garden ecosystem.", 1400, 1400, 1400000, 1400000, 1.15, "treeLife"),
      // Fairy Fountains: Install enchanting fountains that provide a water source for both your garden and local fairies.
      "Fairy Fountain": new Building("Fairy Fountain", "Install enchanting fountains that provide a water source for both your garden and local fairies.", 8000, 8000, 20000000, 20000000, 1.15, "fountain"),
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