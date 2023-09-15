import { Upgrade } from "./Upgrade";
import { Building } from "./building";

export class GardenStats {
    totalFlowers: number = 1e12 + 1;

    handMadeFlowers: number = 0;

    pollinationPower: number = 1;

    buildings: {[name: string]: Building} = {
      "Bee": new Building("Bee", "A helpful bee to pollinate your flowers", 0.1, 0.1, 15, 15, 1.15, "bee"),
      "Dew collector": new Building("Dew collector", "Collect morning dew to provide a natural source of hydration for your flowers", 1, 1, 100, 100, 1.15, "droplet"),

      "Ladybug Nursery": new Building("Ladybug Nursery", "Nurture ladybugs, natural predators of garden pests, to keep your garden pest-free.", 8, 8, 1000, 1000, 1.15, "ladyBug"),

      "Worm Hotel": new Building("Worm Hotel", "Provide a comfortable home for earthworms, which help improve soil quality and aeration.", 50, 50, 12000, 12000, 1.15, "worm"),
      "Rain Wizard": new Building("Rain Wizard", "Summon rain wizards to conjure rain for your thirsty flowers", 300, 300, 150000, 150000, 1.15, "wizard"),

      // Tree of Life: Plant a special tree that supports diverse wildlife and serves as the heart of your garden ecosystem.
      "Tree of Life": new Building("Tree of Life", "Plant a special tree that supports diverse wildlife and serves as the heart of your garden ecosystem.", 1400, 1400, 1400000, 1400000, 1.15, "treeLife"),
      // Fairy Fountains: Install enchanting fountains that provide a water source for both your garden and local fairies.
      "Fairy Fountain": new Building("Fairy Fountain", "Enchanting fountains, a water source for your garden and local fairies.", 8000, 8000, 20000000, 20000000, 1.15, "fountain"),
    };

    // * the names must correspond to building.name
    upgrades: {[name: string]: Upgrade[]} = {

      // 5 click upgrades
      "Click": [
        // min handmade for first is 1000
        new Upgrade("Clicker enthusiast", "", "cursor", "Clicking power gains +1% of your flowers per second.", "You have begun reading about clicking recently.", 50000,
              { functionName: "UnlockClickPower", args: { minimumHandMade: 10, stateVariables: ["handMadeFlowers"] } },
              { functionName: "UpgradeClickPower", args: { improvement: 1.01, stateVariables: ["currentClickPower", "totalPerSecond"] } }),

        new Upgrade("Amateur clicker", "", "cursor", "Clicking power gains +1% of your flowers per second.", "You talk about clicking at family dinners.", 5000000,
              { functionName: "UnlockClickPower", args: { minimumHandMade: 100000, stateVariables: ["handMadeFlowers"] } },
              { functionName: "UpgradeClickPower", args: { improvement: 1.01, stateVariables: ["currentClickPower", "totalPerSecond"] } }),

        new Upgrade("Clicker enjoyer", "", "cursor", "Clicking power gains +1% of your flowers per second.", "In your free time you click.", 500000000,
              { functionName: "UnlockClickPower", args: { minimumHandMade: 10000000, stateVariables: ["handMadeFlowers"] } },
              { functionName: "UpgradeClickPower", args: { improvement: 1.01, stateVariables: ["currentClickPower", "totalPerSecond"] } }),

        new Upgrade("Clicker professional", "", "cursor", "Clicking power gains +1% of your flowers per second.", "You know everything there is to know about clicking.", 50000000000,
              { functionName: "UnlockClickPower", args: { minimumHandMade: 1000000000000, stateVariables: ["handMadeFlowers"] } },
              { functionName: "UpgradeClickPower", args: { improvement: 1.01, stateVariables: ["currentClickPower", "totalPerSecond"] } }),

        new Upgrade("Clicker god", "", "cursor", "Clicking power gains +1% of your flowers per second.", "You have entered a parallel universe where you are worshipped for your clicking prowess.", 5000000000000,
              { functionName: "UnlockClickPower", args: { minimumHandMade: 100000000000, stateVariables: ["handMadeFlowers"] } },
              { functionName: "UpgradeClickPower", args: { improvement: 1.01, stateVariables: ["currentClickPower", "totalPerSecond"] } }),
      ],

      "Bee": [
        new Upgrade("Faster bees", "Bee", "bee", "Bees and cursor are twice as efficient", "Bzzzzzz", 100,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                    { functionName: "UpgradeClickAndBuildingPower", args: { improvement: 2, stateVariables: ["currentClickPower"] } }),

        new Upgrade("Pollen backpacks", "Bee", "bee", "Bees and cursor are twice as efficient", "Handy, nutrient-rich pollination", 500,
                  { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                  { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Winged couriers", "Bee", "bee", "Bees and cursor are twice as efficient", "Sure beats the old wax wings", 10000,
                  { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 10, stateVariables: [] } },
                  { functionName: "UpgradeClickAndBuildingPower", args: { improvement: 2, stateVariables: ["currentClickPower"] } }),

        new Upgrade("Beehive harmony", "Bee", "bee", "Bees and cursor are 10% more efficient for each non-bee helper owned.", "We all love a good icebreaker", 100000,
                  { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 25, stateVariables: [] } },
                  { functionName: "ClickAndBuildingCollectionBonus", args: { improvement: 1.1, stateVariables: ["currentClickPower", "buildings"] } }),

        new Upgrade("Beehive expansion", "Bee", "bee", "Bees and cursor are 10% more efficient for each non-bee helper owned.", "Beez-ness is booming", 100000,
                { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 25, stateVariables: [] } },
                { functionName: "ClickAndBuildingCollectionBonus", args: { improvement: 1.1, stateVariables: ["currentClickPower", "buildings"] } }),

        new Upgrade("Queen Bee's blessing", "Bee", "bee", "Bees and cursor are 10% more efficient for each non-bee helper owned.", "Beats every poker hand", 10000000,
                { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 50, stateVariables: [] } },
                { functionName: "ClickAndBuildingCollectionBonus", args: { improvement: 1.1, stateVariables: ["currentClickPower", "buildings"] } }),

        new Upgrade("Bee-hive mind", "Bee", "bee", "Bees and cursor are 10% more efficient for each non-bee helper owned.", "It's mostly thoughts of honey", 100000000,
                { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 100, stateVariables: [] } },
                { functionName: "ClickAndBuildingCollectionBonus", args: { improvement: 1.1, stateVariables: ["currentClickPower", "buildings"] } }),
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
      "Ladybug Nursery": [
        new Upgrade("Golden Ladybugs", "Ladybug Nursery", "ladyBug", "Ladybug Nurseries are twice as efficient", "They're shiny!", 10000,
          { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
          { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Psychic Ladybugs", "Ladybug Nursery", "ladyBug", "Ladybug Nurseries are twice as efficient", "Not welcome to poker night", 50000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Invisible cloaks", "Ladybug Nursery", "ladyBug", "Ladybug Nurseries are twice as efficient", "Covert pest surveillance, also useful for libraries", 500000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 50, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Jitterbug swing", "Ladybug Nursery", "ladyBug", "Ladybug Nurseries are twice as efficient", "No, they can't do the worm dance", 50000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 100, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

        new Upgrade("Interdimensional spots", "Ladybug Nursery", "ladyBug", "Ladybug Nurseries are twice as efficient", "Not liable for sudden appearance of supervillains", 500000000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 200, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
      ],
      "Worm Hotel": [
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

        ],
        "Rain Wizard": [

          new Upgrade("Pointier hats", "Rain Wizard", "wizard", "Rain Wizards are twice as efficient", "The pointier the better.", 1300000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Umbrella wands", "Rain Wizard", "wizard", "Rain Wizards are twice as efficient", "Just so they can forget it when it rains.", 6500000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
          
          new Upgrade("Precipitation potions", "Rain Wizard", "wizard", "Rain Wizards are twice as efficient", "(They're mostly water).", 65000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 25, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("School of witchcraft and wizardry", "Rain Wizard", "wizard", "Rain Wizards are twice as efficient", "Dual-degree in transfiguration!", 6500000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 50, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Air-obics", "Rain Wizard", "wizard", "Rain Wizards are twice as efficient", "'Why don't we move the clouds closer?'", 650000000000,
                    { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 100, stateVariables: [] } },
                    { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
          ],
        "Tree of Life": [
          new Upgrade("Branch extensions", "Tree of Life", "treeLife", "Trees of life are twice as efficient", "A lot more pleasant than branch downsizing for sure.", 14000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Tree wisdom council", "Tree of Life", "treeLife", "Trees of life are twice as efficient", "Guaranteed to reduce analysis paralysis.", 70000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Photosynthesis supercharger", "Tree of Life", "treeLife", "Trees of life are twice as efficient", "Your tree will now photosynthesise on moonless nights.", 700000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 25, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Kara-oak-e stage", "Tree of Life", "treeLife", "Trees of life are twice as efficient", "Treemendously fun.", 70000000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 50, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Demon fruit", "Tree of Life", "treeLife", "Trees of life are twice as efficient", "They are powerful but come at a terrible price, we don't care though.", 7000000000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 100, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
        ],
        "Fairy Fountain": [
          new Upgrade("Fountain of youth", "Fairy Fountain", "fountain", "Fairy Fountains are twice as efficient", "Easy to find, and definitely curse-free.", 200000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 1, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Eccentric sculptures", "Fairy Fountain", "fountain", "Fairy Fountains are twice as efficient", "Sparks spirited conversation among neighbours.", 1000000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 5, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Limpid clarity", "Fairy Fountain", "fountain", "Fairy Fountains are twice as efficient", "You can see your face in it!", 10000000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 25, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Wishing well", "Fairy Fountain", "fountain", "Fairy Fountains are twice as efficient", "I wish... for a THOUSAND wishes.", 1000000000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 50, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),

          new Upgrade("Mirror of desire", "Fairy Fountain", "fountain", "Fairy Fountains are twice as efficient", "I show not your face but your heart's desire.", 100000000000000,
                      { functionName: "UnlockUpgradeOwnedRequirements", args: { minimumOwned: 100, stateVariables: [] } },
                      { functionName: "UpgradeBuildingPollinationPercent", args: { improvement: 2, stateVariables: [] } }),
        ]
      }
}