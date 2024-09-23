import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ){}

  searchByCapital(term: string): void{

    this.isLoading = true;
    //console.log({term});
    this.countriesService.searchCapital( term ).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
