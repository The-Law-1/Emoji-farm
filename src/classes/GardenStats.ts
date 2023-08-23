import { Building } from "./building";

export class GardenStats {
    totalFlowers: number = 0;

    pollinationPower: number = 1;


    buldings: {[name: string]: Building} = {
        "bees": new Building("bees", 0.2, 0.2, 15, 15, 1.1)
    };
}