export class GardenStats {
    totalFlowers: number = 0;

    pollinationPower: number = 1;


    // TODO replace this with an array of buildings, make sure the fields correspond right
    totalBees: number = 0;
    
    currentBeesCost: number = 15;
    currentBeesPower: number = 0.2; // will be upgraded with upgrades
    beesBasePower: number = 0.2; 
    beesBaseCost: number = 15;
    beesCostMultiplier: number = 1.1;
}