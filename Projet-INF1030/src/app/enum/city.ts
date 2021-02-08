export enum City {
  "Trois-Rivières",
  "Shawinigan",
  "Louiseville",
  "St-Tite"
}

const city: Array<string> = Object.keys(City).filter(key => isNaN(+key));
