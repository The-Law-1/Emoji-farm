import { Building } from "./building";

export class Upgrade {
  title: string = "";

  // you better make these correspond to building names
  svgPath: string = "";

  description: string = "";

  cost: number = 0;

  condition: { functionName: string, args: any[] } = {functionName: "", args:[]};

  owned: boolean = false;

  // colour tier

  // function that takes a building class and upgrades it
  effect: { functionName: string, args: any[] } = {functionName: "", args:[]};

  constructor(title: string, svgPath: string, description: string, cost: number, condition: { functionName: string, args: any[] }, effect: { functionName: string, args: any[] }) {
    this.title = title;
    this.svgPath = svgPath;
    this.description = description;
    this.cost = cost;

    this.condition = condition;
    this.effect = effect;
  }
}