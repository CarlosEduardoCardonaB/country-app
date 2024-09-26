import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countryService: CountriesService){}

  ngOnInit(): void {
    //Aqui recuperamos los datos almacenados de las ultimas consultas que se hace en el country.service.ts para cargarlas en caso de ingresar a esta ruta de nuevo y no tener que lanzar la petición http de nuevo
    this.countries = this.countryService.cacheStore.byCountries.countriesI;
    this.initialValue = this.countryService.cacheStore.byCountries.termI;
  }

  searchByCountry(term: string): void{

    this.countryService.searchCountry(term).subscribe( countries => {
        this.countries = countries;
    })
  }

}
