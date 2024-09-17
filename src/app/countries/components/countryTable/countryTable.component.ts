import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  standalone: false,
  // imports: [
  //   CommonModule,
  // ],
  templateUrl: './countryTable.component.html',
  styles: `
    :host {
      display: block;
    }
    img {
      width: 35px;
    }
  `,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = [];
 }
