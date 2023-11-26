import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
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
  @ViewChild('filter') filterInput!: ElementRef<HTMLInputElement>;
  housingService: HousingService = inject(HousingService);
  loading: boolean = true;
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then(l => {
      this.housingLocationList = l;
      this.filteredLocationList = l;
    }).finally(() => {
      this.loading = false;
    });
  }


  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  submitHandler(event: Event) {
    event.preventDefault();
    if(this.loading) return;
    this.filterResults(this.filterInput.nativeElement.value);
  }

}
