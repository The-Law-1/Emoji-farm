export class Flower {
    name: string;
    svgPath: string;
    currentTimeGrowing: number;
    
    // ! you might want to use ms so that you can go lower than 1 second

    currentTimeToBloom: number; // in seconds
    fullTimeToBloom: number; // in seconds

    yield: number;
    yieldPerSecond: number; // can be x per second or x every y seconds
    wateringGrowthRate: number; // in seconds

    row: number;
    column: number;

    constructor(name: string, svgPath: string, row: number, column: number) {
        this.name = name;
        this.svgPath = svgPath;
        this.currentTimeGrowing = 0;

        this.fullTimeToBloom = 1;
        this.currentTimeToBloom = 0;

        this.row = row;
        this.column = column;
    }
}