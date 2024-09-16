import { Component } from '@angular/core';

@Component({
  selector: 'shared-home-page',
  template: `<p>homePage works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HomePageComponent { }
