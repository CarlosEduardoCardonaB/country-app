import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/country.service';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[]= [];

  public regions: Region[] = ['America', 'Africa', 'Oceania', 'Asia', 'Europe'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService){}

  searchByRegion(region: Region){

    this.selectedRegion = region;

      this.countriesService.searchRegion(region).subscribe( countries => {
        this.countries = countries;
      })
  }


}
