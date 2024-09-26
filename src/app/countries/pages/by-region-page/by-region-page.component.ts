import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/country.service';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[]= [];
  public regions: Region[] = ['America', 'Africa', 'Oceania', 'Asia', 'Europe'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService){}

  ngOnInit(): void {
    //Aqui recuperamos los datos almacenados de las ultimas consultas que se hace en el country.service.ts para cargarlas en caso de ingresar a esta ruta de nuevo y no tener que lanzar la petición http de nuevo
    this.countries = this.countriesService.cacheStore.byRegion.countryI;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.regionI;
  }

  searchByRegion(region: Region){

    this.selectedRegion = region;

      this.countriesService.searchRegion(region).subscribe( countries => {
        this.countries = countries;
      })
  }


}
