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

    // * the names must correspond to building.name
    upgrades: {[name: string]: Upgrade[]} = {
      "bee": [
        new Upgrade("Faster bees", "bee", "bee", "Bees and cursor are twice as efficient", "Bzzzzzz",  100,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                    { functionName: "UpgradeClickAndBuildingPower", args: { improvement: 2, stateVariables: ["currentClickPower"] } }),

        new Upgrade("Pollen backpacks", "bee", "bee", "Bees and cursor are twice as efficient", "Handy, nutrient-rich pollination", 500,
                  { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                  { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Winged couriers", "bee", "bee", "Bees and cursor are twice as efficient", "Sure beats the old wax versions", 10000,
                  { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 10, stateVariables: [] } },
                  { functionName: "UpgradeClickAndBuildingPower", args: { improvement: 2, stateVariables: ["currentClickPower"] } }),

        new Upgrade("Beehive harmony", "bee", "bee", "Bees and cursor are 10% more efficient for each non-bee helper owned.", "We all love a good icebreaker", 100000,
                  { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 25, stateVariables: [] } },
                  { functionName: "ClickAndBuildingCollectionBonus", args: { improvement: .1, stateVariables: ["currentClickPower", "buildings"] } }),
            ],

      "Dew collector": [
        new Upgrade("Aqua booster", "Dew collector", "droplet", "Dew collectors are twice as efficient", "Advanced condensation technology", 1000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Morning mist magnifier", "Dew collector", "droplet", "Dew collectors are twice as efficient", "Specialized lenses, capturing even the tiniest droplets from the morning mist", 5000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Crystal dew reservoir", "Dew collector", "droplet", "Dew collectors are twice as efficient", "A crystal-clear dew reservoir that stores larger quantities of refreshing dew, keeping your garden hydrated for longer periods", 50000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 25, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Midnight dew gathering", "Dew collector", "droplet", "Dew collectors are twice as efficient", "Extend dew collection to nighttime hours, ensuring round-the-clock nourishment", 5000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 50, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Dew reserve expansion", "Dew collector", "droplet", "Dew collectors are twice as efficient", " Expand your dew reservoir's capacity to store larger quantities of moisture", 500000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 100, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        ],
      "Ladybug": [
        new Upgrade("Golden Ladybugs", "Ladybug", "ladyBug", "Ladybug Nurseries are twice as efficient", "They're shiny!", 10000,
          { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
          { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Psychic Ladybugs", "Ladybug", "ladyBug", "Ladybug Nurseries are twice as efficient", "Not welcome to poker night", 50000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Invisible cloaks", "Ladybug", "ladyBug", "Ladybug Nurseries are twice as efficient", "Covert pest surveillance, also useful for libraries", 500000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 50, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Jitterbug swing", "Ladybug", "ladyBug", "Ladybug Nurseries are twice as efficient", "No, they can't do the worm dance", 50000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 100, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Interdimensional spots", "Ladybug", "ladyBug", "Ladybug Nurseries are twice as efficient", "Not liable for sudden appearance of supervillains", 500000000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 200, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
      ],
      "Worm hotel": [
        new Upgrade("Worm whisperer", "Worm Hotel", "worm", "Worm Hotels are twice as efficient", "Worms have the best gossip.", 120000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Tunnel museum", "Worm Hotel", "worm", "Worm Hotels are twice as efficient", "They specialize in abstract worm paintings.", 600000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Underground club", "Worm Hotel", "worm", "Worm Hotels are twice as efficient", "Yes, they can in fact do the worm dance.", 6000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 25, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Swimming pool", "Worm Hotel", "worm", "Worm Hotels are twice as efficient", "A moist worm is a happy worm.", 6000000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 100, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
                    
        new Upgrade("Wormhole generator", "Worm Hotel", "worm", "Worm Hotels are twice as efficient", "Side effects include losing your keys and TV remotes.", 6000000000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 200, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        ]
      }
}