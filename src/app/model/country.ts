export class Country {
    constructor(public name: string) { }
    public id: number;
    public code: number;
    public number: number;
    public alpha2code: string;
    public alpha3code: string;
    public _world_region: string;
    public world_subregion: string;
    public currency: {
      name: string;
      code: string;
      unit: string;
    };
    public world_region: {
      code: string;
      name: string;
    }
  }