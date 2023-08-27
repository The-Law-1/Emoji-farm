export class Building {

    name: string = "";

    totalOwned: number =  0;

    basePollinationPower: number = 0;
    currentPollinationPower: number = 0; // will be upgraded with upgrades

    baseCost: number = 0;
    currentCost: number = 0;
    costMultiplier: number = 0; // high cost multiplier will make the game difficult, low cost multiplier will make the game easy

    svgPath: string = "";

    constructor(name: string, basePollinationPower: number, currentPollinationPower: number, baseCost: number, currentCost: number, costMultiplier: number, svgPath: string) {
        this.name = name;

        this.totalOwned = 0;

        this.basePollinationPower = basePollinationPower;
        this.currentPollinationPower = currentPollinationPower;

        this.baseCost = baseCost;
        this.currentCost = currentCost;

        this.costMultiplier = costMultiplier;
    }
}