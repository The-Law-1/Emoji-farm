import { Building } from "./building";

export class Upgrade {
  title: string = "";

  svgPath: string = "";

  description: string = "";

  cost: number = 0;

  condition: Function = (building: Building) => true;

  // colour tier

  // function that takes a building class and upgrades it
  effect: Function = (building: Building) => void 0;

  constructor(title: string, svgPath: string, description: string, cost: number, condition: Function, effect: Function) {
    this.title = title;
    this.svgPath = svgPath;
    this.description = description;
    this.cost = cost;

    this.condition = condition;
    this.effect = effect;
  }
}