import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
    //En este ngOnInit, recuperamos la data guardada en caché de nuestra última busqueda. Este esta definido en el country.service.ts
    //Con este nos ahorramos una petición http y solo cargamos lo que ya habíamos consultado con anterioridad
    this.countries = this.countriesService.cacheStore.byCapital.countriesI;
    this.initialValue = this.countriesService.cacheStore.byCapital.termI; //Este initial value lo mandamos al searchBox.component.ts por medio de Input para que lo precarge en la caja de texto de busqueda
  }

  searchByCapital(term: string): void{

    this.isLoading = true;
    //console.log({term});
    this.countriesService.searchCapital( term ).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
