import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-contact-page',
  template: `<p>Call me later ;]</p>`,
  styles: `
    :host {
      display: block;
    }
  `
})
export class ContactComponent { }
