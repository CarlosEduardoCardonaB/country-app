import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

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
    return this.getPetition(url);
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }?fullText=true`;
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
