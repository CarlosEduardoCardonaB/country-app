import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SidebarComponent { }
