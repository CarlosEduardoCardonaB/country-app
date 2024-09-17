import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
   ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(
      params => {

          this.countriesService.searchCountryByAlphaCode(params['id'])
          .subscribe( country => {
            console.log({country});
          }
        );
        //console.log({params: params['id']})
      }
    )
  }

}
