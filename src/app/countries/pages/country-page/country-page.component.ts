import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country1?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
   ){}

  ngOnInit(): void {
    //aqui con este this.activatedRoute.params lo que hacemos es capturar el parámetro que nos llega en la URL y poder manipularlo.
    //La url de este componente esta en country-routing.module.ts como path: 'by/:id'

    //Esta es la forma de obtener la data con switchmap. (Esta y la de abajo funcionan similar)
    // this.activatedRoute.params
    // .pipe(
    //   switchMap(( params ) => this.countriesService.searchCountryByAlphaCode( params['id'])),
    // )
    // .subscribe( ( country ) => {
    //       console.log( country );
    //   }
    // );


    //Esta es la segunda forma de obtener la info sin switchmap
    // this.activatedRoute.params
    // .subscribe( ( params ) => {

    //       this.countriesService.searchCountryByAlphaCode(params['id'])
    //       .subscribe( country => {
    //         console.log({country});
    //       }
    //     );
    //   }
    // );


    //ejemplo 1 pero con desestructuración del objeto params que se hace en {id}
    this.activatedRoute.params
    .pipe(
      switchMap(( {id} ) => this.countriesService.searchCountryByAlphaCode( id)),
    )
    .subscribe( ( country ) => {
          if( !country ) return this.router.navigateByUrl('');
          //console.log( country );
          return this.country1 = country;
       }
    );

  }

}
