export class Building {

    name: string = "";

    totalOwned: number =  0;

    currentPollinationPower: number = 0; // will be upgraded with upgrades

    baseCost: number = 0;
    currentCost: number = 0;
    costMultiplier: number = 0; // high cost multiplier will make the game difficult, low cost multiplier will make the game easy

    constructor(name: string, currentPollinationPower: number, currentCost: number, baseCost: number, costMultiplier: number) {
        this.name = name;

        this.totalOwned = 0;
        this.currentPollinationPower = currentPollinationPower;
        this.baseCost = baseCost;
        this.currentCost = currentCost;

        this.costMultiplier = costMultiplier;
    }
}