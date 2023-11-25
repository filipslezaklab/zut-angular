import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingService } from '../housing.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, HousingLocationComponent]
})
export class HomeComponent {

  housingLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService) {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }

}
