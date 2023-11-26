import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  readonly url = 'http://localhost:37611/locations';

  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  constructor() {
  }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    const json = await data.json();
    if(!json || !Array.isArray(json)) {
      return [];
    }
    return json as HousingLocation[];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const json = await data.json();
    if(!json) {
      return undefined;
    }
    return json as HousingLocation;
  }
}
