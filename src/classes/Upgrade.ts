
export class Upgrade {
  title: string = "";

  // you better make these correspond to building names
  svgPath: string = "";

  description: string = "";

  subDescription: string = "";

  buildingName: string = "";

  cost: number = 0;

  // name of function in utils, the args obj contains hard coded upgrades, and names of shop state variables to pass to it (on top of the building in question of course)
  condition: { functionName: string, args: any } = {functionName: "", args: {}};

  owned: boolean = false;
  accessible: boolean = false;

  // colour tier

  // name of function in utils, the args obj contains hard coded upgrades, and names of shop state variables to pass to it (on top of the building in question of course)
  effect: { functionName: string, args: any } = {functionName: "", args: {}};

  constructor(title: string, buildingName: string, svgPath: string, description: string, subDescription: string, cost: number, condition: { functionName: string, args: any }, effect: { functionName: string, args: any }) {
    this.title = title;
    this.buildingName = buildingName;
    this.svgPath = svgPath;
    this.description = description;
    this.subDescription = subDescription;
    this.cost = cost;

    this.condition = condition;
    this.effect = effect;

    this.owned = false;
  }
}