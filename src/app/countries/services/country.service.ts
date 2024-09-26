import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: {termI: '', countriesI: []},
    byCountries: {termI: '', countriesI:[]},
    byRegion: {regionI: '', countriesI: []}
  }

  constructor(private httpClient: HttpClient) {

    console.log('Este log se imprime desde el country.service.ts y es para demostrar que este no se destruye con el ciclo de vida de cada componente, por lo tanto lo puedo usar como persistencia de algunos datos')
  }

  private getPetition (url: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>( url )
    .pipe(
      catchError( () => of([])),
      //delay(2000),
      //Delay para probar el loading. Este no es necesario normalmente
    );
    //el pipe() es un operador de rxjs (librerias para manejar reactividad)
    //Dentro del pipe al retornar el of([]) estamos retornando un arreglo vacío en caso de error
    //y desde donde lo llamamos que es countryTable.component.html tenemos la condicion de que si es un arreglo vacío, pinte el mensaje de "no hay paises que mostrar"

    //NOTA, cuando lanzamos una petición get con el paquete de angular de http no tenemos de des suscribirnos como lo hacemos en el
    //ejemplo del debouncer en el searchBox.component.ts
    //para des suscribirnos para dejar de escuchar la pausa en el teclado cuando se destruye el componente.
    //En este caso para las peticiones http esta libreria ya tiene implicita la des suscripción
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    //return this.getPetition(url);
    return this.httpClient.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( error => of(null))
    );
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getPetition(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {termI: term, countriesI: countries} )
      //Este "tap" se usa para ejecutar algo sin interferir en la petición que se está haciendo.
      //En este caso estamos guardando la información de la respuesta para ser persistida por si el usuario vuelve a esta página de buscar por capital y no tener que hacer petición http de nuevo
    );
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getPetition(url);
  }

  searchRegion( region: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getPetition(url);
    // return this.httpClient.get<Country[]>( url ).pipe(
    //   catchError( error => of([]))
    // );
  }



}
